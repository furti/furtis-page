const path = require('path');
const fs = require('fs-extra');
const libs = [
    {
        source: path.join(__dirname, '../node_modules/core-js/client/shim.min.js'),
        target: 'shim.min.js'
    },
    {
        source: path.join(__dirname, '../node_modules/core-js/client/shim.min.js.map'),
        target: 'shim.min.js.map'
    },
    {
        source: path.join(__dirname, '../node_modules/zone.js/dist/zone.min.js'),
        target: 'zone.min.js'
    }
];

function copylib() {
    const promises = [];

    libs.forEach(lib => {
        console.log(`copying file ${lib.source}`);

        promises.push(
            fs.copy(lib.source, path.join(__dirname, '../final', lib.target))
                .then(() => {
                    console.log(`${lib.source} copied`);
                }).catch((err) => {
                    console.log(`${lib.source} error: ${err}`);
                }));
    });

    return Promise.all(promises);
}

module.exports = copylib;
