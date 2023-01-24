import chalk from "chalk";
import { spawn , exec } from "child_process";
import { db } from "./databaseUtility.js";
import { matchSorter } from "match-sorter";
import prompts from "prompts";

const loginShopify = ({ domain }) => {
  const args = ["theme", 'dev'];
  domain &&
    spawn("shopify", args, {
      stdio: "inherit",
      env: {
        ...process.env,
        SHOPIFY_FLAG_STORE: domain,
      }
    });
  // exec(`export SHOPIFY_FLAG_STORE=${domain}`);
};

const suggest = (input, choices) =>
  matchSorter(choices, input, { keys: ["title"] });
const values = db.getList();
const choices = values.map((domain) => ({ title: domain }));
const fallback = values.length > 0 ? values[0] : false;
const cliSelectOptions = {
  type: "autocomplete",
  name: "domain",
  message: `Select a store ${chalk.yellow(
    "(Choose with ↑ ↓ ⏎, Type something to filter )"
  )}`,
  limit: 15,
  suggest,
  choices,
  fallback: {
    title: `No domains found`,
    value: fallback,
  },
};

export { prompts, cliSelectOptions, loginShopify, chalk };
