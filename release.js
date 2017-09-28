const exec = require('child_process').exec;
const packageJson = require('./package.json');
const path = require('path');
const fs = require('fs-extra');
const copydir = require('copy-dir');
const targetPath = path.join(__dirname, '../furtis-page-dist');

function filterPackageJson(packageToFilter) {
    const propertyNames = Object.getOwnPropertyNames(packageToFilter);
    const newPackageJson = {};

    for (let propertyName of propertyNames) {
        if (propertyName === 'scripts') {
            newPackageJson.scripts = {
                start: packageToFilter.scripts.start
            };
        }
        else if (propertyName !== 'devDependencies') {
            newPackageJson[propertyName] = packageToFilter[propertyName];
        }
    }

    return newPackageJson;
}

function copyDist() {
    console.log('copying dist directory');

    copydir(path.join(__dirname, 'dist'), path.join(targetPath, 'dist'), (err) => {
        if (err) {
            console.error(`exec error: ${error}`);

            return;
        }

        console.log('dist directory copied');
    });
}

function build() {
    console.log('starting build');

    exec('npm run build --prod', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);

            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        copyDist();
    });
}

function copyServerDir() {
    console.log('copying server directory');

    copydir(path.join(__dirname, 'server'), path.join(targetPath, 'server'), (err) => {
        if (err) {
            console.error(`exec error: ${error}`);

            return;
        }

        console.log('Server directory copied');

        build();
    });
}

function copyServer() {
    console.log('copying server.js');

    fs.copy(path.join(__dirname, 'server.js'), path.join(targetPath, 'server.js'), (err) => {
        if (err) {
            console.error(`exec error: ${error}`);

            return;
        }

        console.log('server.js copied');

        copyServerDir();
    })
}

function copyPackageJson() {
    console.log('writing package.json');
    let newPackageJson = filterPackageJson(packageJson);

    fs.writeFile(path.join(targetPath, 'package.json'), JSON.stringify(newPackageJson, null, 4), (err) => {
        if (err) {
            console.error(`exec error: ${error}`);

            return;
        }

        console.log('package.json written.');

        copyServer();
    });
}

copyPackageJson();
