#! /usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from '../modules/main.js';

yargs(hideBin(process.argv))
	.usage('Usage: $0 [options]')
	.command('$0', 'show a list of the saved domains to login', {}, run)
	.option('add', {
		alias: 'a',
		demandOption: false,
		describe: 'add store domain to the database manually',
		type: 'string',
	})
	.option('path', {
		demandOption: false,
		describe: 'return the path to the database (json file), do NOT modify the structure',
		type: 'boolean',
	})
	.option('pull', {
		alias: 'p',
		demandOption: false,
		describe: 'pull the theme from shopify',
		type: 'boolean',
	})
	.option('open', {
		alias: 'o',
		demandOption: false,
		describe: 'open the theme in the browser',
		type: 'boolean',
	})
	.option('port', {
		demandOption: false,
		describe: 'port to serve the theme',
		type: 'number',
	})
	.help('help')
	.example([['$0 --add storedomain.myshopify.com', 'add storedomain.myshopify.com to the database']]).argv;
