import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/post", async (req, res) => {
  console.log(req.body);
  const { userId, content } = req.body;
  if (!content) {
    return res.status(400).send("content is required");
  }
  try {
    await prisma.$connect();
    const tweet = await prisma.tweets.create({
      data: {
        content,
        userId,
      },
    });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).send("An error occurred" + error);
  }
});

router.get("/", async (req, res) => {
  try {
    await prisma.$connect();
    const tweets = await prisma.tweets.findMany();
    res.json(tweets);
  } catch (error) {
    res.status(500).send("An error occurred" + error);
  }
});


export default router;
