const path = require('path');
const fs = require('fs-extra');
const copydir = require('copy-dir');

function copyServerDir(targetPath, resolve, reject) {
    console.log('copying server directory');

    copydir(path.join(__dirname, '../server'), path.join(targetPath, 'server'), (err) => {
        if (err) {
            console.error(`exec error: ${error}`);

            reject();

            return;
        }

        console.log('Server directory copied');

        resolve();
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
