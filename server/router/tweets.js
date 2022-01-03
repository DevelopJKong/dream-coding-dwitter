import express from "express";
import "express-async-errors";
import * as tweetController from '../controller/tweets';
const tweetsRouter = express.Router();

// GET /tweets
// GET /tweets?username=:username // => : 은 정확히 무슨 뜻이지? // 삼항 연산자
/*controller */
tweetsRouter.get("/", tweetController.getTweets);

// GET /tweets/:id
tweetsRouter.get("/:id", tweetController.getTweet);

// POST /tweets
tweetsRouter.post("/", tweetController.createTweet);

// PUT /tweets/:id
tweetsRouter.put("/:id", tweetController.updateTweet);

// DELETE /tweets/:id
tweetsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweetsRepository.remove(id);
  res.sendStatus(204);
});

export default tweetsRouter;
