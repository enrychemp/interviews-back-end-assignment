import mongoose from "mongoose";
import { MONGODB_URI } from "../config";
import Consola from "consola";

const dbConn = async () => {
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}`);
    // console.log(conn);
    mongoose.connection.on("open", () => {
      Consola.success(`MongoDB open...`);
    });
    Consola.success(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    Consola.error(error);
    process.exit(1);
  }
};

export default dbConn;
