import express from "express";
import "express-async-errors"

const tweetsRouter = express.Router();

// GET /tweets
// GET /tweets?username=:username // => : 은 정확히 무슨 뜻이지?
// GET /tweets/:id
// POST /tweets
// PUT /tweets/:id
// DELETE /tweets/:id



export default tweetsRouter;