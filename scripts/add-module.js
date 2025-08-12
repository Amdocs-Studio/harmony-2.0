#!/usr/bin/env node
const path = require('path');

const {
	readJsonFile,
} = require('./utils');
const chalk = require('chalk');
const {addSpaModule} = require("./add-spa-module");
const {addMpaModule} = require("./add-mpa-module");

async function addModule(argv) {
	const harmonyJsonContent = readJsonFile(path.join(process.cwd(), 'harmony.json'));

	if (!harmonyJsonContent) {
		console.error('harmony.json file not found.');
		process.exit(1);
	}
	const questions = {
		moduleName: {
			message: 'Enter module name (dash case, i.e. post-list):',
			validate: input => {
				if (!input || !input.trim()) {
					return 'Module name cannot be empty.'
				}
				return true;
			}
		},
		selectType: {
			message: 'Select type to add:',
			choices: [
				{
					name: 'UI Module',
					value: 'ui',
				},
				{
					name: 'API Module',
					value: 'api',
				},
			],
		}
	}
	if (['spa', 'spa-light'].includes(harmonyJsonContent.template)) {
		await addSpaModule(argv, harmonyJsonContent, questions);
	} else {
		await addMpaModule(argv, harmonyJsonContent, questions);
	}
	console.log(`Module added ${chalk.green('successfully! ✓')}`);
}

module.exports = { addModule };