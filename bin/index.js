#! /usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { run } = require("../modules/main.js");

yargs(hideBin(process.argv))
  .usage("Usage: $0 [options]")
  .command("$0", "show a list of the saved domains to login", {}, run)
  .option("a", {
    alias: "add",
    demandOption: false,
    describe: "add store domain to the database manually",
    type: "string",
  })
  .option("p", {
    alias: "path",
    demandOption: false,
    describe:
      "return the path to the database (json file), do NOT modify the structur",
    type: "boolean",
  })
  .help("help")
  .example([
    [
      "$0 --add storedomain.myshopify.com",
      "add storedomain.myshopify.com to the database",
    ],
  ]).argv;
