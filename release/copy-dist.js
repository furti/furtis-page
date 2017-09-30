const path = require('path');
const copydir = require('copy-dir');

function copyDist(targetPath) {
    console.log('copying final directory');

    return new Promise((resolve, reject) => {
        copydir(path.join(__dirname, '../final'), path.join(targetPath, 'dist'), (err) => {
            if (err) {
                console.error(`exec error: ${error}`);

                reject();

                return;
            }

            console.log('dist directory copied');

            resolve();
        });
    });
}

module.exports = copyDist;
