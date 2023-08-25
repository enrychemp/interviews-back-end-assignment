import Consola from "consola";
import dbConn from "../libs/db";
import runPostSeed from "./posts";

function reset() {
  if (process.argv.includes("reset")) {
    return true;
  }
  return false;
}

(async () => {
  try {
    const conn = await dbConn();
    console.info(`Connected to database`);
    await runPostSeed(reset()).finally(() => {
      process.exit(0);
    });
  } catch (error) {
    Consola.error(error);
    process.exit(1);
  }
})();
