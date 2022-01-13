import express from "express";
import "express-async-errors";
import {body} from "express-validator";
import * as tweetController from "../controller/tweets.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

// validation
// sanitization
// Contract Testing : Client-Server

const tweetsRouter = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  validate,
];



// GET /tweets
// GET /tweets?username=:username // => : 은 정확히 무슨 뜻이지? // 삼항 연산자
/*controller */
tweetsRouter.get("/",isAuth, tweetController.getTweets);

// GET /tweets/:id
tweetsRouter.get("/:id",isAuth, tweetController.getTweet);

// POST /tweets
tweetsRouter.post("/",isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
tweetsRouter.put("/:id",isAuth,validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id7
tweetsRouter.delete("/:id",isAuth, tweetController.deleteTweet);

export default tweetsRouter;
