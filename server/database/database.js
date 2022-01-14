import { config } from "../config.js";
import Mongoose from "mongoose";

export const connectDB = async () => {
  return Mongoose.connect(config.db.host);
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false
  // }
};

export function useVirtualId(schema) {
  // _id -> id
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}

//TODO(jeongbin): Delete below

let db;


export function getTweets() {
  return db.collection("tweets");
}
