import express from "express";
import "express-async-errors";

// 이렇게 let을 사용하는것은 정말 나쁘다고 하셨는데 왜? 정확히 엄청 안좋은거지?
let tweets = [
  {
    id: "1",
    text: "드림코딩 화이팅",
    createdAt: Date.now().toString(),
    name: "jeong",
    username: "jeong",
    url: "https://source.unsplash.com/random/1",
  },
  {
    id: "2",
    text: "안녕하세요",
    createdAt: Date.now().toString(),
    name: "yuzhu",
    username: "yuzhu",
  },
];

const tweetsRouter = express.Router();

// GET /tweets
// GET /tweets?username=:username // => : 은 정확히 무슨 뜻이지? // 삼항 연산자
/*controller */
tweetsRouter.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => {
        tweet.username === username;
      })
    : tweets;
  console.log(username);
  res.status(200).json(data);
});

// GET /tweets/:id
tweetsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweets
tweetsRouter.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// PUT /tweets/:id
tweetsRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    console.log(tweet);
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
tweetsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.sendStatus(204);
});

export default tweetsRouter;
