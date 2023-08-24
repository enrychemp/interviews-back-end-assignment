import express, { Request, Response } from "express";
import nofavicon from "express-no-favicons";
import path from "path";
import router from "./api/router";
import { NODE_ENV, NODE_PORT } from "./config";
import Consola from "consola";

const packageData = require(path.resolve(process.cwd() + "/package.json"));

const app = express();

app.disable("x-powered-by");

app.use(function (req: Request, res: Response, next) {
  res.setHeader("X-Api-Version", `${packageData.version}`);
  next();
});

app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json({ limit: "10mb" }));

// No favicon
app.use(nofavicon());

// routes
app.use(router);

// Start server
export default async function () {
  try {
    app.listen(NODE_PORT, function () {
      Consola.success(
        `Express server listening on ${NODE_PORT} in ${NODE_ENV} mode`
      );
    });
  } catch (error) {
    throw error.message;
  }
}
