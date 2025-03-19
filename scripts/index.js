#! /usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { createProject } = require('./create-project');
const { addModule } = require('./add-module');

const argv = yargs(hideBin(process.argv))
    .command('create [name] [dir]', 'Create a new project', {
        template: {
            description: 'Template to use (spa | mpa)',
            alias: 't',
            type: 'string',
        },
        prefix: {
            description: 'Module prefix',
            alias: 'p',
            type: 'string',
        }
    }, (argv) => {
        createProject(argv);
    })
    .command('add [type] [name]', 'Add a new module', {
        name: {
            description: 'Name of the module',
            alias: 'n',
            type: 'string',
        },
        type: {
            description: 'type of the module (ui | api)',
            alias: 't',
            type: 'string',
        }
    }, (argv) => {
        addModule(argv);
    })
    .demandCommand(1, 'You need to specify a command')
    .help()
    .argv;