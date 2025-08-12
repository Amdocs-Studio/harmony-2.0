#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('@inquirer/prompts');
const chalk = require('chalk');
const {
    wait,
    dashToCamelCase,
    copyAndReplaceTokens,
    copyFileAndReplaceTokens, dashToCapitalized, getProjectNameTokens
} = require('./utils');

const templatesDir = path.join(__dirname, '../templates'); // Assuming templates are in a 'templates' folder in the same directory as the script

const questions = {
    createProject: {
        message: 'Enter project name:',
        required: true,
    },
    modulePrefix: {
        message: 'Enter module prefix:',
    },
    selectTemplate: {
        message: 'Select project template:',
        choices: [
            {
                name: 'Single Page Application (SPA)',
                value: 'spa',
                description: 'SPA template with React, Vite, and TypeScript, Flow manager and example pages',
            },
            {
                name: 'Multi Page Application (MPA)',
                value: 'mpa',
                description: 'MPA template with Lerna, Vite, React, and TypeScript, Flow manager and example pages',
            },
            {
                name: 'Single Page Application - Light (SPA-Light)',
                value: 'spa-light',
                description: 'SPA template with React, Vite, and TypeScript minimal setup',
            },
            {
                name: 'Multi Page Application - Light (MPA-Light)',
                value: 'mpa-light',
                description: 'MPA template with Lerna, Vite, React, and TypeScript minimal setup',
            },
        ],
    }
}

async function createProject(argv) {
    const projectName = (argv.name || await inquirer.input(questions.createProject)).replace(/ /g, '-').toLowerCase();
    const template = argv.template || await inquirer.select(questions.selectTemplate);
    const projectDir = (argv.dir || projectName).replace(/ /g, '-').toLowerCase();
    let modulePrefix = '';
    // if (template === 'mpa') {
    //     modulePrefix = argv.prefix || await inquirer.input({message: 'Enter module prefix:', default: projectName});
    // }

    console.log(`Creating project '${chalk.blue(projectName)}' with template '${chalk.green(template)}'...`);
    const projectPath = path.join(process.cwd(), projectDir); // Project created in current working directory

    if (fs.existsSync(projectPath)) {
        console.error(`Directory '${projectDir}' already exists.`);
        process.exit(1);
    }
    const tokens = getProjectNameTokens(projectName);
    const harmonyJsonTokens = {
        '#project-name#': projectName,
        '#template#': template,
        '#module-prefix#': modulePrefix
    }
    try {
        const templatePath = path.join(templatesDir, 'project', template);
        await copyAndReplaceTokens(templatePath, projectPath, tokens);
        await wait(500);
        copyFileAndReplaceTokens(path.join(templatesDir, 'harmony.json'), path.join(projectPath, 'harmony.json'), harmonyJsonTokens);
        await wait(500);
        fs.copyFileSync(path.join(templatesDir, 'gitignore-template'), path.join(projectPath, '.gitignore'));

        const installDeps = await inquirer.confirm({message: 'Install dependencies?'});
        if (installDeps) {
            // Install dependencies (if package.json exists in the template)
            const packageJsonPath = path.join(projectPath, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
                console.log('Installing dependencies...');
                execSync('npm install', {cwd: projectPath, stdio: 'inherit'}); // or yarn install
            }
        }

        console.log(`Project '${chalk.blue(projectName)}' created ${chalk.green('successfully! ✓')}`);
        console.log(`Go to the project directory: ${chalk.yellow(`cd ${projectDir}`)}`);
        if (!installDeps) {
            console.log(`Install dependencies: ${chalk.yellow('npm install')}`);
        }
        if (template === 'mpa' || template === 'mpa-light') {
            console.log(`Run the build command (mandatory for mpa tester): ${chalk.yellow('npm run build')}`);
            console.log(`Run the MPA tester: ${chalk.yellow('npm start')}`);
            console.log(`Run the development server (spa mode): ${chalk.yellow('npm run dev')}`);
        } else {
            console.log(`Start the development server: ${chalk.yellow('npm start')}`);
        }

    } catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }
}

module.exports = { createProject };