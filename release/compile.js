const exec = require('child_process').exec;

function rollup(resolve, reject) {
    console.log('starts rollup');

    exec('npm run rollup', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);

            reject();

            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        resolve();
    });
}

function compile() {
    console.log('starts compiling');

    return new Promise((resolve, reject) => {
        exec('npm run compile', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);

                reject();

                return;
            }

            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);

            rollup(resolve, reject);
        });
    });
}

module.exports = compile;
