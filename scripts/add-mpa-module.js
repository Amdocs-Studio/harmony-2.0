#!/usr/bin/env node

const path = require('path');
const inquirer = require('@inquirer/prompts');

const {
	dashToCamelCase,
	wait,
	copyAndReplaceTokens,
	addImportApi,
	addModuleToStore,
	addModuleToModuleIndex,
	getModuleNameTokens
} = require('./utils');

const templatesDir = path.join(__dirname, '../templates');

async function addMpaModule(argv, harmonyJsonContent, questions) {
	const type = (argv.type || await inquirer.select(questions.selectType)).toLowerCase();
	const module = (argv.name || await inquirer.input(questions.moduleName)).replace(/ /g, '-').toLowerCase();
	const projectName = harmonyJsonContent.projectName;
	const ProjectName = dashToCamelCase(projectName)
	const moduleNameTokens = getModuleNameTokens(module);
	const tokens = {
		'project-name': projectName,
		'ProjectName': ProjectName,
		...moduleNameTokens,
	};
	const moduleNameDash = moduleNameTokens["module-name"];
	const camelCaseModuleName = moduleNameTokens["ModuleName"];
	const moduleName = moduleNameTokens["moduleName"];
	const modulePath = type === 'ui' ?
		path.join(process.cwd(), 'src/ui-modules', `${projectName}-${moduleNameDash}`)
		:
		path.join(process.cwd(), `src/base-modules/${projectName}-sdk/src/modules`, moduleNameDash);

	try {
		const templatePath = path.join(templatesDir, 'module', type === 'api' ? 'spa' : 'mpa', type);
		await copyAndReplaceTokens(templatePath, modulePath, tokens);
		if (type === 'ui') {
			await wait(500);
			addModuleToModuleIndex(path.join(process.cwd(), 'src/ui-modules/index.ts'), `${projectName}-${moduleNameDash}/src`);
		}
		else if (type === 'api') {
			await wait(500);
			addImportApi(path.join(process.cwd(), `src/base-modules/${projectName}-sdk/src/modules/index.ts`), moduleNameDash, camelCaseModuleName);
			await wait(500);
			addModuleToStore(path.join(process.cwd(), `src/base-modules/${projectName}-sdk/src/store.ts`), moduleName, moduleNameDash);
		}

	} catch (error) {
		console.error('Error creating project:', error);
		process.exit(1);
	}
}

module.exports = { addMpaModule };