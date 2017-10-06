const DataURI = require('datauri').promise;
const path = require('path');
const fs = require('fs');

let file = process.argv[2];

if (!file) {
    console.error('File must be specified. "node image-to-datauri.js <filename>"');
}
else {
    if (file.startsWith(".")) {
        file = path.join(process.cwd(), file);
    }

    DataURI(file)
        .then(encoded => {
            fs.writeFile(path.join(process.cwd(), 'encoded_image.txt'), encoded, err => {
                if (err) {
                    console.log(error)
                }
                else {
                    console.log('image encoded');
                }
            });
        })
        .catch(error => console.error(error));
}

