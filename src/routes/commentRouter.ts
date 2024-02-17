import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();


router.post("/post", async (req, res) => {
  const { tweetId, content } = req.body;
  if (!content) {
    return res.status(400).send("content is required");
  }
  try {
    const comment = await prisma.comments.create({
      data: {
        content,
        tweetId,
      },
      include: {
        tweet: true,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).send("An error occurred" + error);
  }
});

router.get("/:tweetId", async (req, res) => {
  const { tweetId } = req.params;
  try {
    const comments = await prisma.comments.findMany({
      where: {
        tweetId: parseInt(tweetId),
      },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).send("An error occurred" + error);
  }
});

router.post("/nested", async (req, res) => {
  const { commentId, content } = req.body;
  if (!content) {
    return res.status(400).send("content is required");
  }
  try {
    const commentOnComment = await prisma.nestedComment.create({
      data: {
        content,
        commentId,
      },
      include: {
        comment: true,
      },
    });
    res.status(201).json(commentOnComment);
  } catch (error) {
    res.status(500).send("An error occurred" + error);
  }
});

export default router;
