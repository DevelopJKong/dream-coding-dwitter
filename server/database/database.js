import { config } from "../config";
import {MongoClient} from "mongodb";

export const connectDB = () => {
    return new MongoClient(config.db.host).connect();
}

