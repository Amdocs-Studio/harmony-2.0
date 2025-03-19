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
    copyFileAndReplaceTokens
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
                description: 'SPA template with React, Vite, and TypeScript',
            },
            {
                name: 'Multi Page Application (MPA)',
                value: 'mpa',
                description: 'MPA template with Lerna, Vite, React, and TypeScript',
            },
        ],
    }
}

async function createProject(argv) {
    const projectName = argv.name || await inquirer.input(questions.createProject);
    const template = argv.template || await inquirer.select(questions.selectTemplate);
    let modulePrefix = '';
    // if (template === 'mpa') {
    //     modulePrefix = argv.prefix || await inquirer.input({message: 'Enter module prefix:', default: projectName});
    // }

    console.log(`Creating project '${chalk.blue(projectName)}' with template '${chalk.green(template)}'...`);
    const projectPath = path.join(process.cwd(), argv.dir || projectName); // Project created in current working directory

    if (fs.existsSync(projectPath)) {
        console.error(`Directory '${projectName}' already exists.`);
        process.exit(1);
    }
    const tokens = {
        'project-name': projectName,
        'module-prefix': modulePrefix,
        'ProjectName': dashToCamelCase(projectName),
    }
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
        console.log(`Go to the project directory: ${chalk.yellow(`cd ${argv.dir || projectName}`)}`);
        if (!installDeps) {
            console.log(`Install dependencies: ${chalk.yellow('npm install')}`);
        }
        console.log(`Start the development server: ${chalk.yellow('npm start')}`);

    } catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }
}

module.exports = { createProject };