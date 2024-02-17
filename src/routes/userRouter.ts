import { Router } from "express";
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    await prisma.$connect();
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password !== password) {
      return res.status(401).send("Invalid password");
    }
    res.status(200).send("Logged in");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(400).send("All fields are required");
  }
  try {
    await prisma.$connect();
    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUsername) {
      return res.status(409).send("User already exists");
    }
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return res.status(409).send("Email already exists");
    }
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

export default router;
