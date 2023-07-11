import { db, defaultPath } from '../modules/databaseUtility.js';
import {
	prompts,
	cliSelectOptions,
	hasConfig,
	serveShopify,
	serveShopifyUsingEnv,
	chalk,
} from '../modules/choicesCli.js';

const run = (argv) => {
	if (argv.path) {
		console.log(`Database Path: ${defaultPath}`);
		console.log(chalk.yellow('pls do NOT modify the structure'));
	} else if (argv.add) {
		if (!db.hasElement(argv.add)) {
			db.addStore(argv.add);
		}
	} else {
		hasConfig.then((hasConfig) => {
			if (hasConfig) {
				serveShopifyUsingEnv({ pull: argv.pull, port: argv.port });
			} else {
				if (db.getList().length <= 0) {
					console.log(chalk.red('No Data found, pls add some stores'));
				} else {
					prompts(cliSelectOptions)
						.then(({ domain }) => serveShopify({ domain, pull: argv.pull, port: argv.port }))
						.catch(console.error);
				}
			}
		});
	}
};

export { run };
