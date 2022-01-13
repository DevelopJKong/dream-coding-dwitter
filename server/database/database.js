import { config } from "../config.js";
import { MongoClient } from "mongodb";

let db;

export const connectDB = async() => {
  return new MongoClient(config.db.host).connect().then(client=> db= client.db());
};

export function getUsers() {
    return db.collection('users');
}

export function getTweets() {
    return db.collection('tweets');
}