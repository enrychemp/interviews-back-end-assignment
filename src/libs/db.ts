import mongoose from "mongoose";
import { MONGODB_URI } from "../config";
import Consola from "consola";

const dbConn = async () => {
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}`);

    Consola.success(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    Consola.error(error);
    process.exit(1);
  }
};

export default dbConn;
