const path = require('path');
const fs = require('fs-extra');
const srcFile = path.join(__dirname, '../src/index.html');
const targetFile = path.join(__dirname, '../final/index.html');

function processHtml() {
    console.log('writing html file');

    return new Promise((resolve, reject) => {
        fs.readFile(srcFile, 'utf-8', (err, data) => {
            if (err) {
                console.log(`error reading file ${srcFile}: ${err}`);

                reject();

                return;
            }

            data = data.replace('<!-- polyfills -->', '<script src="shim.min.js"></script>\n<script src="zone.min.js"></script>\n<script src="clarity-icons.min.js"></script>');
            data = data.replace('<!-- bundle-script -->', '<script src="build.js"></script>');
            data = data.replace('<!-- styles -->', '<link rel="stylesheet" media="all" href="styles.css" />')

            fs.writeFile(targetFile, data, (err) => {
                if (err) {
                    console.log(`error writing file ${targetFile}: ${err}`);
                    reject();
                }
                else {
                    console.log('html file written');
                    resolve();
                }
            });
        });
    });
}

module.exports = processHtml;
