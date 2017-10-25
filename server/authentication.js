"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("./database");
const jwt_1 = require("./jwt");
const crypto_1 = require("crypto");
const router = express_1.Router();
const client = new database_1.Database();
function checkPassword(plainTextPassword, salt, hashedPassword) {
    return new Promise((resolve, reject) => {
        crypto_1.pbkdf2(plainTextPassword, salt, 100000, 64, 'sha512', (err, hash) => {
            if (err) {
                reject(err);
            }
            const actualHash = hash.toString('base64');
            if (actualHash === hashedPassword) {
                resolve();
            }
            else {
                reject('Passwords do not match');
            }
        });
    });
}
router.post('/', (req, resp) => {
    const authData = req.body;
    let result = null;
    console.log(`got authentication request ${authData.username}`);
    if (!authData || !authData.username || !authData.password) {
        resp.status(400).send('Benutzername oder Password nicht korrekt.');
    }
    else {
        client
            .getUser(authData.username)
            .then(user => {
            console.log(`found user`);
            return checkPassword(authData.password, user.salt, user.password) //
                .then(() => {
                const token = jwt_1.createToken(user._id, user.name, user.roles);
                resp.status(200).json({
                    token
                });
            });
        })
            .catch(error => {
            console.log(error);
            resp.status(400).send('Benutzername oder Password nicht korrekt.');
        });
    }
});
module.exports = router;
