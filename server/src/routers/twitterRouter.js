import express from "express";
import {home} from "../controllers/twitterController"

const twitterRouter = express.Router();

twitterRouter.get("/tweets",home);


export default twitterRouter;
