const path = require('path');
const copydir = require('copy-dir');


function copyAssets() {
    console.log('copying assets');

    return new Promise((resolve, reject) => {
        copydir(path.join(__dirname, '../src/assets'), path.join(__dirname, '../final/assets'), (err) => {
            if (err) {
                console.error(`exec error: ${error}`);

                reject();

                return;
            }

            console.log('assets directory copied');

            resolve();
        });
    });
}

module.exports = copyAssets;
