const CleanCss = require('clean-css');
const path = require('path');
const fs = require('fs-extra');

function processCss() {
    console.log('processing css');

    const cleanCss = new CleanCss({
        returnPromise: true
    });

    return cleanCss.minify([path.resolve(__dirname, '../src/styles.css')])
        .then(result => {

            console.log('Finished css minify. storing file:');
            console.log(result.errors);
            console.log(result.warnings);

            return new Promise((resolve, reject) => {
                fs.writeFile(path.resolve(__dirname, '../final/styles.css'), result.styles, (err) => {
                    if (err) {
                        console.log(`Error writing styles: ${err}`);
                        reject();
                    }
                    else {
                        console.log(`Styles written.`);
                        resolve();
                    }
                });
            });
        }).catch(error => {
            consle.log(`Error processing css ${error}`);

            throw error;
        });

    // return new Promise((resolve, reject) => {

    // });
}

module.exports = processCss;
