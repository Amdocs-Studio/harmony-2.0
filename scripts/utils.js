/* eslint-disable */
const path = require('path');
const fs = require('fs');

const ignoreFolders = ['node_modules', '.idea', 'dist', '.nx'];

async function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function getModuleNameTokens(moduleName) {
	const moduleNameDash = moduleName.replace(/ /g, '-').toLowerCase();
	const camelCaseModuleName = moduleNameDash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
	const moduleNameCamelCase = camelCaseModuleName.charAt(0).toLowerCase() + camelCaseModuleName.slice(1);
	const moduleNameWithSpaces = moduleNameDash.replace(/-/g, ' ').toLowerCase();
	const ModuleNameWithSpaces = moduleNameWithSpaces.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	return {
		'module-name': moduleNameDash,
		'ModuleName': camelCaseModuleName,
		'moduleName': moduleNameCamelCase,
		'module name': moduleNameWithSpaces,
		'Module Name': ModuleNameWithSpaces,
	};
}

function getProjectNameTokens(projectName) {
	const projectNameDash = projectName.replace(/ /g, '-').toLowerCase();
	const camelCaseProjectName = projectNameDash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
	const projectNameCamelCase = camelCaseProjectName.charAt(0).toLowerCase() + camelCaseProjectName.slice(1);
	const projectNameWithSpaces = projectNameDash.replace(/-/g, ' ').toLowerCase();
	const ProjectNameWithSpaces = projectNameWithSpaces.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	return {
		'project-name': projectNameDash,
		'ProjectName': camelCaseProjectName,
		'projectName': projectNameCamelCase,
		'project name': projectNameWithSpaces,
		'Project Name': ProjectNameWithSpaces,
	};
}


async function copyAndReplaceTokens(from, to, tokens) {
	fs.mkdirSync(to, {recursive: true});
	copyDirSync(from, to);
	await wait(500);
	renameFilesInDirectory(to, tokens);
	await wait(500);
	replaceTokensInDirectory(to, tokens);
}

function copyDirSync(src, dest) {
	fs.readdirSync(src).forEach(file => {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);
		const stat = fs.statSync(srcPath);
		if (stat.isDirectory() && ignoreFolders.includes(file)) {
			return;
		}
		if (stat.isDirectory()) {
			fs.mkdirSync(destPath, { recursive: true });
			copyDirSync(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	});
}

function copyFileAndReplaceTokens(from, to, tokens) {
	fs.copyFileSync(from, to);
	replaceTokensInFile(to, tokens);
}

function readJsonFile(filePath) {
	if (fs.existsSync(filePath)) {
		const data = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(data);
	} else {
		console.error(`File '${filePath}' does not exist.`);
		return null;
	}
}

function dashToCamelCase(str) {
	return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function dashToCapitalized(str) {
	return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function replaceTokensInString(str, tokens) {
	let result = str;
	for (const [key, value] of Object.entries(tokens)) {
		result = result.replace(new RegExp(key, 'g'), value);
	}
	return result;
}

function renameFilesInDirectory(dir, tokens) {
	fs.readdirSync(dir).forEach(file => {
		const oldPath = path.join(dir, file);
		const newPath = path.join(dir, replaceTokensInString(file, tokens));
		if (fs.statSync(oldPath).isDirectory()) {
			renameFilesInDirectory(oldPath, tokens);
		}
		if (oldPath !== newPath) {
			fs.renameSync(oldPath, newPath);
		}
	});
}
function replaceTokensInFile(filePath, tokens) {
	const data = fs.readFileSync(filePath, 'utf8');
	const result = replaceTokensInString(data, tokens);
	fs.writeFileSync(filePath, result, 'utf8');
}

function replaceTokensInDirectory(dir, tokens) {
	fs.readdirSync(dir).forEach(file => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			replaceTokensInDirectory(filePath, tokens);
		} else {
			replaceTokensInFile(filePath, tokens);
		}
	});
}
function addImportApi(filePath, moduleNameDash, moduleNameCamelCase) {
	const moduleNameApi = `${moduleNameCamelCase.charAt(0).toLowerCase()}${moduleNameCamelCase.slice(1)}Api`;
	const data = fs.readFileSync(filePath, 'utf8');
	const result = `export { use${moduleNameCamelCase}, ${moduleNameApi} } from './${moduleNameDash}';\nexport type * from './${moduleNameDash}/${moduleNameCamelCase}Types';\n${data}`;
	fs.writeFileSync(filePath, result, 'utf8');
}
function addModuleToStore(filePath, moduleName, moduleNameDash) {
	const data = fs.readFileSync(filePath, 'utf8');
	const result = `import { ${moduleName}Api, ${moduleName}Reducers, ${moduleName}Config } from './modules/${moduleNameDash}';\n${data}`
		.replace('const reducers = {', `const reducers = {\n	...${moduleName}Reducers,`)
		.replace('const middlewares: Middleware[] = [];', `const middlewares: Middleware[] = [];\nif (${moduleName}Config.withApi) {\n	middlewares.push(${moduleName}Api.middleware);\n}`);
	fs.writeFileSync(filePath, result, 'utf8');
}

function addModuleIntl(filePath, moduleName) {
	const data = fs.readFileSync(filePath, 'utf8');
	const result  = data.replace('} from \'@ui-modules\';', `\t${moduleName}Descriptor,\n} from '@ui-modules';`)
		.replace('export const enMessages = {', `export const enMessages = {\n	${moduleName}: ${moduleName}Descriptor.en,`)
	fs.writeFileSync(filePath, result, 'utf8');
}

function addModuleToModuleIndex(filePath, moduleNameDash){
	const data = fs.readFileSync(filePath, 'utf8');
	const result = `export * from './${moduleNameDash}';\n${data}`;
	fs.writeFileSync(filePath, result, 'utf8');
}



module.exports = {
	readJsonFile,
	dashToCamelCase,
	copyAndReplaceTokens,
	addImportApi,
	addModuleToStore,
	wait,
	copyFileAndReplaceTokens,
	dashToCapitalized,
	addModuleToModuleIndex,
	addModuleIntl,
	getModuleNameTokens,
	getProjectNameTokens
}