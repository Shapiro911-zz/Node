const fs = require('fs/promises');
const { lstatSync } = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');

//npm start or node L4/index.js --substring <string>

let executionDir = process.cwd();

const options = yargs
    .options('d', {
        describe: 'Path to the directory',
        alias: 'dir',
        default: process.cwd(),
    })
    .options('s', {
        alias: 'substring',
        default: '',
    }).argv;
console.log(options);

const isDir = (path) => lstatSync(path).isDirectory();

const run = async () => {
    const list = await fs.readdir(executionDir);
    let chosenPath;
    await inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: 'Choose category: ',
            choices: list,
        }
    ]).then(({ fileName }) => {
        chosenPath = path.join(executionDir, fileName);
    });

    if (isDir(chosenPath)) {
        executionDir = chosenPath;
        return await run();
    }
    else {
        const data = await fs.readFile(chosenPath, 'utf-8');
        if (!options.substring) {
            console.log(data)
        }
        else {
            const regExp = new RegExp(options.substring, 'igm');
            console.log(data.match(regExp));
        }
    }

}

run();
