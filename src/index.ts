import express from "express";
import userRouter from "./routes/userRouter";
import tweetRouter from "./routes/tweetRouter";
import commentRouter from "./routes/commentRouter"

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/tweets", tweetRouter);
app.use("/comments", commentRouter);

app.get("/health", (req, res) => {
  res.send("End point is healthy!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
