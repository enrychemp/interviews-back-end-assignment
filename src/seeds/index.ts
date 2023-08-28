import Consola from "consola";
import dbConn from "../libs/db";
import runPostSeed from "./posts";
import { argv } from "node:process";

function reset() {
  if (argv.includes("--reset")) {
    return true;
  }
  return false;
}
function getPostsN() {
  let postsN = 10;
  argv.forEach((val, index) => {
    if (val.startsWith("posts=")) {
      const [k, v] = val.split("=");
      // console.log(`${key}: ${postsN}`);
      if (!isNaN(+v) && +v > 0) {
        postsN = +v;
      }
    }
  });
  return postsN;
}

(async () => {
  try {
    const conn = await dbConn();
    // console.log(getPostsN());
    console.info(`Connected to database`);
    await runPostSeed(reset(), getPostsN()).finally(() => {
      process.exit(0);
    });
  } catch (error) {
    Consola.error(error);
    process.exit(1);
  }
})();
