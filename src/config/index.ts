import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const appEnvs = dotenv.config();

dotenvExpand.expand(appEnvs);

function requiredProcessEnv(name: string): string | Error {
  if (!name) {
    throw new Error("You must set the name parameter");
  }
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name]!;
}

requiredProcessEnv("NODE_ENV");
requiredProcessEnv("MONGODB_URI");

export const NODE_ENV = process.env.NODE_ENV || "dev";
export const MONGODB_URI = process.env.MONGODB_URI;

export const NODE_PORT = process.env.NODE_PORT || 8000;
