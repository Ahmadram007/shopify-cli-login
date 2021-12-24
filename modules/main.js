const { db, path } = require("../modules/databaseUtility.js");
const {
  cliSelect,
  cliSelectOptions,
  loginShopify,
  chalk,
} = require("../modules/choicesCli.js");

const isValidDomain = (item) => {
  return item && item !== "" && item.match(/.*[.]myshopify[.]com$/g);
};

const run = (argv) => {
  if (argv.path) {
    console.log(`Database Path: ${path}`);
    console.log(chalk.yellow("pls do NOT modify the structur"));
  } else if (argv.add) {
    if (!!isValidDomain(argv.add) && !db.hasElement(argv.add)) {
      db.addStore(argv.add);
    } else {
      !db.hasElement(argv.add) &&
        console.log(
          chalk.red("invalid store domain: should end with .myshopify.com")
        );
    }
  } else {
    if (cliSelectOptions.values.length <= 0) {
      console.log(chalk.red("No Data found, pls add some stores"));
    } else {
      cliSelect(cliSelectOptions).then(loginShopify);
    }
  }
};

module.exports = { run };
