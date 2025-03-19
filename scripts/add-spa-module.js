#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('@inquirer/prompts');

const {
    dashToCamelCase, wait, copyAndReplaceTokens, addImportApi, addModuleToStore,
} = require('./utils');

const templatesDir = path.join(__dirname, '../templates'); // Assuming templates are in a 'templates' folder in the same directory as the script

function addModuleIntl(filePath, moduleNameDash, moduleName, moduleNameCamelCase){
    const data = fs.readFileSync(filePath, 'utf8');
    const result = `import { ${moduleName}Descriptor } from '../${moduleNameDash}/${moduleNameCamelCase}.i18n';\n${data}`
        .replace('export const enMessages = {', `export const enMessages = {\n	${moduleName}: ${moduleName}Descriptor.en,`)
    fs.writeFileSync(filePath, result, 'utf8');
}

function addModuleJsonAliases(filePath, moduleNameDash){
    const data = fs.readFileSync(filePath, 'utf8');
    const result = data.replace('"paths": {', `"paths": {\n      "@${moduleNameDash}": ["./src/modules/${moduleNameDash}/index.tsx"],`);
    fs.writeFileSync(filePath, result, 'utf8');
}

function addModuleViteAlias(filePath, moduleNameDash){
    const data = fs.readFileSync(filePath, 'utf8');
    const result = data.replace('alias: [', `alias: [\n            {find: '@${moduleNameDash}', replacement: resolve(projectRootDir, 'src/modules/${moduleNameDash}/index.tsx')},`);
    fs.writeFileSync(filePath, result, 'utf8');
}

async function addSpaModule(argv, harmonyJsonContent, questions) {
    const type = (argv.type || await inquirer.select(questions.selectType)).toLowerCase();
    const module = argv.name || await inquirer.input(questions.moduleName);
    const moduleNameDash = module;
    const camelCaseModuleName = dashToCamelCase(module);
    const moduleName = camelCaseModuleName.charAt(0).toLowerCase() + camelCaseModuleName.slice(1);
    const tokens = {
        'module-name': moduleNameDash,
        'ModuleName': camelCaseModuleName,
        'moduleName': moduleName,
    };
    const modulePath = type === 'ui' ?
        path.join(process.cwd(), 'src', 'modules', moduleNameDash)
        :
        path.join(process.cwd(), 'src', 'modules', 'sdk', 'modules', moduleNameDash);

    try {
        const templatePath = path.join(templatesDir, 'module/spa', type);
        await copyAndReplaceTokens(templatePath, modulePath, tokens);
        if (type === 'api') {
            await wait(500);
            addImportApi(path.join(process.cwd(), 'src/modules/sdk/modules/index.ts'), moduleNameDash, camelCaseModuleName);
            await wait(500);
            addModuleToStore(path.join(process.cwd(), 'src/modules/sdk/store.ts'), moduleName, moduleNameDash);
        } else {
            await wait(500);
            addModuleIntl(path.join(process.cwd(), 'src/modules/app-intl/intl.i18n.ts'), moduleNameDash, moduleName, camelCaseModuleName);
            await wait(500);
            addModuleJsonAliases(path.join(process.cwd(), 'tsconfig.app.json'), moduleNameDash);
            await wait(500);
            addModuleViteAlias(path.join(process.cwd(), 'vite.config.ts'), moduleNameDash);
        }

    } catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }

}

module.exports = { addSpaModule };