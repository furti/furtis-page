const exec = require('child_process').exec;

function compile() {
    console.log('starts compiling');

    return new Promise((resolve, reject) => {
        exec('npm run compileserver', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);

                reject();

                return;
            }

            resolve();
        });
    });
}

module.exports = compile;
