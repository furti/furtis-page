const packageJson = require('../package.json');
const path = require('path');
const fs = require('fs-extra');
const requiredDependencies = ['express', 'body-parser'];

function filterPackageJson(packageToFilter) {
    const propertyNames = Object.getOwnPropertyNames(packageToFilter);
    const newPackageJson = {};

    for (let propertyName of propertyNames) {
        if (propertyName === 'scripts') {
            newPackageJson.scripts = {
                start: packageToFilter.scripts.start
            };
        }
        if (propertyName === 'dependencies') {
            let newDependencies = {};

            requiredDependencies.forEach(dependency => {
                if (packageToFilter.dependencies[dependency]) {
                    newDependencies[dependency] = packageToFilter.dependencies[dependency];
                }
            });

            newPackageJson.dependencies = newDependencies;
        }
        else if (propertyName !== 'devDependencies') {
            newPackageJson[propertyName] = packageToFilter[propertyName];
        }
    }

    return newPackageJson;
}

function copyPackageJson(targetPath) {
    console.log('writing package.json');
    let newPackageJson = filterPackageJson(packageJson);

    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(targetPath, 'package.json'), JSON.stringify(newPackageJson, null, 4), (err) => {
            if (err) {
                console.error(`exec error: ${error}`);

                reject();

                return;
            }

            console.log('package.json written.');

            resolve();
        });
    });
}

module.exports = copyPackageJson;
