#! /usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from '../modules/main.js';

yargs(hideBin(process.argv))
	.usage('Usage: $0 [options]')
	.command('$0', 'show a list of the saved domains to login', {}, run)
	.option('a', {
		alias: 'add',
		demandOption: false,
		describe: 'add store domain to the database manually',
		type: 'string',
	})
	.option('pa', {
		alias: 'path',
		demandOption: false,
		describe: 'return the path to the database (json file), do NOT modify the structure',
		type: 'boolean',
	})
	.option('p', {
		alias: 'pull',
		demandOption: false,
		describe: 'pull the theme from shopify',
		type: 'boolean',
	})
	.help('help')
	.example([['$0 --add storedomain.myshopify.com', 'add storedomain.myshopify.com to the database']]).argv;
