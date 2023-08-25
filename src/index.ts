import Consola from "consola";
import app from "./app";
import mongoose from "mongoose";
import dbConn from "./libs/db";
const server = async () => {
  try {
    await dbConn();

    await app();
  } catch (error) {
    Consola.error(error);
    process.exit(1);
  }
};

export default server();
