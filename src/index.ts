import Consola from "consola";
import app from "./app";
const server = async () => {
  try {
    await app();
  } catch (error) {
    Consola.error(error);
    process.exit(-1);
  }
};

export default server();
