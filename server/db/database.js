import { config } from "../config.js";
import SQ from "sequelize";

const { host, user, database, password, port } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "postgres",
  logging: false,
  port,
  dialectOptions: {
    ssl: {
      require:true,
      rejectUnauthorized:false,
    }
  }
});
