import chalk from 'chalk';
import { spawn } from 'child_process';
import { db } from './databaseUtility.js';
import { matchSorter } from 'match-sorter';
import prompts from 'prompts';
import fs from 'fs-extra';

const suggest = (input, choices) => matchSorter(choices, input, { keys: ['title'] });
const values = db.getList();
const choices = values.map((domain) => ({ title: domain }));
const fallback = values.length > 0 ? values[0] : false;
const cliSelectOptions = {
	type: 'autocomplete',
	name: 'domain',
	message: `Select a store ${chalk.yellow('(Choose with ↑ ↓ ⏎, Type something to filter )')}`,
	limit: 15,
	suggest,
	choices,
	fallback: {
		title: `No domains found`,
		value: fallback,
	},
};

const hasConfig = fs.pathExists('./shopify.theme.toml');
const writeConfig = (domain) => {
	const data = `[environments.login]\nstore = "${domain}"`;
	const path = './shopify.theme.toml';
	fs.ensureFileSync(path);
	fs.writeFileSync(path, data);
};
const serveShopify = ({ domain, pull, port, open }) => {
	const args = ['theme'];
	if (open) {
		args.push('open');
	} else if (pull) {
		args.push('pull');
	} else {
		args.push('dev');
	}
	port = port && !isNaN(port) && port.toString().length === 4 ? port : 9292;
	port && !pull && !open && args.push('--port', port);
	domain &&
		spawn('shopify', args, {
			stdio: 'inherit',
			env: {
				...process.env,
				SHOPIFY_FLAG_STORE: domain,
			},
		});
	domain && !open && writeConfig(domain);
};
const serveShopifyUsingEnv = ({ pull, port, open }) => {
	const args = ['theme'];
	if (open) {
		args.push('open');
	} else if (pull) {
		args.push('pull');
	} else {
		args.push('dev');
	}
	args.push('--environment=login');
	port = port && !isNaN(port) && port.toString().length === 4 ? port : 9292;
	port && !pull && !open && args.push('--port', port);
	spawn('shopify', args, {
		stdio: 'inherit',
	});
};

export { prompts, cliSelectOptions, hasConfig, serveShopify, serveShopifyUsingEnv, chalk };
