const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

function copyServerDir(targetPath, resolve, reject) {
    console.log('copying server files');

    const sourceDir = path.join(__dirname, '../server')

    glob(path.join(sourceDir, '*.js'), (err, files) => {
        if (err) {
            console.error(`glob error: ${err}`);

            reject();

            return;
        }

        const promises = [];

        files.forEach(file => {
            const targetFile = path.join(targetPath, 'server', path.basename(file));

            const promise = new Promise((resolve, reject) => {
                fs.copy(file, targetFile, err => {
                    if (err) {
                        console.error(`exec error: ${err}`);

                        reject();

                        return;
                    }

                    console.log(`Copied file ${file}`);
                    resolve();
                });
            });

            promises.push(promise);
        });

        Promise.all(promises)
            .then(resolve)
            .catch(reject);
    });
}

function copyServer(targetPath) {
    console.log('copying server.js');

    return new Promise((resolve, reject) => {
        fs.copy(path.join(__dirname, '../server.js'), path.join(targetPath, 'server.js'), (err) => {
            if (err) {
                console.error(`exec error: ${error}`);

                reject();

                return;
            }

            console.log('server.js copied');

            copyServerDir(targetPath, resolve, reject);
        });
    });
}

module.exports = copyServer;
