import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets";
import authRouter from "./router/auth";
import { config } from "./config";
import { initSocket } from "./connection/socket.js";
import { db } from "./database/database";
import { connectDB } from "./database/database";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});
const handleListening = () =>
  console.log(
    `Server listening on port http://localhost:${config.host.port} 😎`
  );

connectDB()
  .then((db) => {
    console.log("DB connection!", db);
    const server = app.listen(config.host.port, handleListening);
    initSocket(server);
  })
  .catch(console.error);
