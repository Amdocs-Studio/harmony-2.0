#!/usr/bin/env node

const path = require('path');
const inquirer = require('@inquirer/prompts');

const {
	wait,
	copyAndReplaceTokens,
	addImportApi,
	addModuleToStore,
	addModuleIntl,
	addModuleToModuleIndex,
	getModuleNameTokens,
} = require('./utils');

const templatesDir = path.join(__dirname, '../templates'); // Assuming templates are in a 'templates' folder in the same directory as the script

async function addSpaModule(argv, harmonyJsonContent, questions) {
	const type = (argv.type || await inquirer.select(questions.selectType)).toLowerCase();
	const module = argv.name || await inquirer.input(questions.moduleName);
	const tokens = getModuleNameTokens(module);
	const moduleNameDash = tokens["module-name"];
	const camelCaseModuleName = tokens["ModuleName"];
	const moduleName = tokens["moduleName"];
	const modulePath = type === 'ui' ?
		path.join(process.cwd(), 'src', 'ui-modules', moduleNameDash)
		:
		path.join(process.cwd(), 'src', 'base-modules', 'sdk', 'modules', moduleNameDash);

	try {
		const templatePath = path.join(templatesDir, 'module/spa', type);
		await copyAndReplaceTokens(templatePath, modulePath, tokens);
		if (type === 'api') {
			await wait(500);
			addImportApi(path.join(process.cwd(), 'src/base-modules/sdk/modules/index.ts'), moduleNameDash, camelCaseModuleName);
			await wait(500);
			addModuleToStore(path.join(process.cwd(), 'src/base-modules/sdk/store.ts'), moduleName, moduleNameDash);
		} else {
			await wait(500);
			addModuleIntl(path.join(process.cwd(), 'src/base-modules/app-intl/intl.i18n.ts'), moduleName);
			await wait(500);
			addModuleToModuleIndex(path.join(process.cwd(), 'src/ui-modules/index.ts'), moduleNameDash);
		}

	} catch (error) {
		console.error('Error creating project:', error);
		process.exit(1);
	}

}

module.exports = { addSpaModule };