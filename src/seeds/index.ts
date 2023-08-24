import runPostSeed from "./posts";

function reset() {
  if (process.argv.includes("reset")) {
    return true;
  }
  return false;
}

(async () => {
  await runPostSeed(reset()).finally(() => {
    process.exit(0);
  });
})();
