import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";

//라이브러리들도 "외부 모듈" & "내부 모듈" 구분해서 관리하는것이 좋다

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
  credentials:true, // allow the Access-Control-Allow-Credentials
}

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));
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
//수정완료
sequelize.sync().then(() => {
  console.log(`Server is started .... ${new Date()}`);
  const server = app.listen(config.port);
  initSocket(server);
});
//db.getConnection().then((connection) => console.log("Connection DB")).catch(console.error);
