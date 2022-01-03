import express from "express";
import "express-async-errors";
import * as tweetsRepository from '../data/tweets';
const tweetsRouter = express.Router();

// GET /tweets
// GET /tweets?username=:username // => : 은 정확히 무슨 뜻이지? // 삼항 연산자
/*controller */
tweetsRouter.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => {
      tweetsRepository.getAllByUsername(username);
      })
    : tweetsRepository.getAll();
  console.log(username);
  res.status(200).json(data);
});

// GET /tweets/:id
tweetsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweetsRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweets
tweetsRouter.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = tweetsRepository.create(text,name,username)
  res.status(201).json(tweet);
});

// PUT /tweets/:id
tweetsRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetsRepository.update(id,text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
tweetsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweetsRepository.remove(id);
  res.sendStatus(204);
});

export default tweetsRouter;
