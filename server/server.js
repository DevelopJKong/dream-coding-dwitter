import express from "express";
import "express-async-errors"
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets";
import authRouter from "./router/auth";
import { config } from "./config";
import { Server } from "socket.io";
import dotenv from "dotenv";


dotenv.config(); 


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets',tweetsRouter);
app.use('/auth',authRouter);

app.use((req,res,next) => {
    res.sendStatus(404);
})

app.use((error,req,res,next) => {
    console.log(error);
    res.sendStatus(500);
})
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${config.host.port} 😎`);
const server = app.listen(config.host.port,handleListening);
const socketIO = new Server(server,{
  cors: {
    origin:'*'
  }
});

socketIO.on('connection',(socket) => {
  console.log('Client is here!');
  socketIO.emit('dwitter','Hello ❤');
});