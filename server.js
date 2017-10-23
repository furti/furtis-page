const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sections = require('./server/sections');
const authentication = require('./server/authentication');
const app = express();

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
