import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";

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
sequelize.sync().then(() => {
  console.log("DB Connection");
  const server = app.listen(config.host.port, handleListening);
  initSocket(server);
});
//db.getConnection().then((connection) => console.log("Connection DB")).catch(console.error);
