const cliSelect = require("cli-select");
const chalk = require("chalk");
const { pointer } = require("figures");
const { spawn } = require("child_process");
const { db, path } = require("./databaseUtility.js");

const valueRenderer = (value, selected) => {
  const toRenValue = `${values.indexOf(value) + 1}. ${value}`;
  if (selected) {
    return chalk.green.bold(`${pointer} ${toRenValue}`);
  }
  return `  ${toRenValue}`;
};
const values = db.getList();

const cliSelectOptions = {
  values,
  valueRenderer,
  indentation: 4,
  selected: "",
  unselected: "",
};

const loginShopify = (selectedStoreDomain) => {
  const args = ["login", `--store=${selectedStoreDomain.value}`];
  spawn("shopify", args, {
    stdio: "inherit",
  });
};

module.exports = { cliSelect, cliSelectOptions, loginShopify, chalk };
