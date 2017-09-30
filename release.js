const packageCopy = require('./release/package');
const compile = require('./release/compile');
const processHtml = require('./release/process-html');
const copyLib = require('./release/copy-lib');
const copyDist = require('./release/copy-dist');
const copyServer = require('./release/copy-server');
const copyAssets = require('./release/copy-assets');
const css = require('./release/css');
const path = require('path');
const targetPath = path.join(__dirname, '../furtis-page-dist');



Promise.all([
    packageCopy(targetPath),
    compile(),
    processHtml(),
    copyLib(),
    copyAssets(),
    copyServer(targetPath),
    css(),
]).then(() => {
    copyDist(targetPath);
});
