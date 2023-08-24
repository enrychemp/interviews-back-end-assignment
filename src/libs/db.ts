import { createConnection } from "mongoose";
import { MONGODB_URI } from "../config";
import Consola from "consola";

const mongoDbOptions = {
  // autoReconnect: true,
  // reconnectTries: 1000000,
  // reconnectInterval: 3000,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
};
const dbConn = createConnection(`${MONGODB_URI}`, mongoDbOptions);

dbConn.on("connected", () => {
  Consola.info("MongoDB connection Established");
});

dbConn.on("error", (error) => {
  Consola.error(`MongoDB ERROR: ${error}`);
});
export default dbConn;
