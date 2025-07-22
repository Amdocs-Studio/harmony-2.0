#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('@inquirer/prompts');

const {
	dashToCamelCase,
	wait,
	copyAndReplaceTokens,
	addImportApi,
	addModuleToStore
} = require('./utils');

function addModuleIntl(filePath, moduleNameDash, moduleName, moduleNameCamelCase, projectName){
	const data = fs.readFileSync(filePath, 'utf8');
	const result = `import { ${moduleName}Descriptor } from '../../${projectName}-${moduleNameDash}/src/${moduleNameCamelCase}.i18n';\n${data}`
		.replace('export const enMessages = {', `export const enMessages = {\n	${moduleName}: ${moduleName}Descriptor.en,`)
	fs.writeFileSync(filePath, result, 'utf8');
}

function addModuleJsonAliases(filePath, moduleNameDash, projectName){
	const data = fs.readFileSync(filePath, 'utf8');
	const result = data.replace('"paths": {', `"paths": {\n	  "@${moduleNameDash}": ["./src/modules/${projectName}-${moduleNameDash}/src/index.ts"],`);
	fs.writeFileSync(filePath, result, 'utf8');
}

function addModuleViteAlias(filePath, moduleNameDash, projectName){
	const data = fs.readFileSync(filePath, 'utf8');
	const result = data.replace('alias: [', `alias: [\n        {find: '@${moduleNameDash}', replacement: resolve(projectRootDir, 'src/modules/${projectName}-${moduleNameDash}/src/index.ts')},`);
	fs.writeFileSync(filePath, result, 'utf8');
}
const templatesDir = path.join(__dirname, '../templates');

async function addMpaModule(argv, harmonyJsonContent, questions) {
	const type = (argv.type || await inquirer.select(questions.selectType)).toLowerCase();
	const module = argv.name || await inquirer.input(questions.moduleName);
	const projectName = harmonyJsonContent.projectName;
	const ProjectName = dashToCamelCase(projectName)
	const moduleNameDash = module;
	const camelCaseModuleName = dashToCamelCase(module);
	const moduleName = camelCaseModuleName.charAt(0).toLowerCase() + camelCaseModuleName.slice(1);
	const tokens = {
		'module-name': moduleNameDash,
		'ModuleName': camelCaseModuleName,
		'moduleName': moduleName,
		'project-name': projectName,
		'ProjectName': ProjectName
	};
	const modulePath = type === 'ui' ?
		path.join(process.cwd(), 'src/modules', `${projectName}-${moduleNameDash}`)
		:
		path.join(process.cwd(), `src/modules/${projectName}-sdk/src/modules`, moduleNameDash);

	try {
		const templatePath = path.join(templatesDir, 'module', type === 'api' ? 'spa' : 'mpa', type);
		await copyAndReplaceTokens(templatePath, modulePath, tokens);
		if (type === 'ui') {
			await wait(500);
			await copyAndReplaceTokens(path.join(templatesDir, 'module/spa/ui'), path.join(modulePath, 'src'), tokens);
			await wait(500);
			addModuleIntl(path.join(process.cwd(), `src/modules/${projectName}-app-intl/src/intl.i18n.ts`), moduleNameDash, moduleName, camelCaseModuleName, projectName);
			await wait(500);
			addModuleJsonAliases(path.join(process.cwd(), 'tsconfig.app.json'), moduleNameDash, projectName);
			await wait(500);
			addModuleViteAlias(path.join(process.cwd(), 'vite.config.ts'), moduleNameDash, projectName);
		}
		else if (type === 'api') {
			await wait(500);
			addImportApi(path.join(process.cwd(), `src/modules/${projectName}-sdk/src/modules/index.ts`), moduleNameDash, camelCaseModuleName);
			await wait(500);
			addModuleToStore(path.join(process.cwd(), `src/modules/${projectName}-sdk/src/store.ts`), moduleName, moduleNameDash);
		}

	} catch (error) {
		console.error('Error creating project:', error);
		process.exit(1);
	}

}

module.exports = { addMpaModule };