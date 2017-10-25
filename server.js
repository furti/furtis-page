const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sections = require('./server/sections');
const authentication = require('./server/authentication');
const crypto = require('crypto');
const app = express();

function passwordHashPerformance() {
    const data = [];

    for (var i = 0; i < 10; i++) {
        data.push({
            password: crypto.randomBytes(10),
            salt: crypto.randomBytes(24)
        });
    }

    const start = new Date().getTime();

    for (const d of data) {
        crypto.pbkdf2Sync(d.password, d.salt, 100000, 64, 'sha512');
    }

    const end = new Date().getTime();

    console.log(`Hashed a single password in ${(end - start) / data.length} ms`);
}

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(bodyParser.json());

// Serve everything from dist to the client as it is
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api/sections', sections);

app.use('/authenticate', authentication);

//All other requestst should be handled by angular. e.g. /about-me,...
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, ip, () => {
    console.log('Server listening on port ' + port);
});

passwordHashPerformance();
