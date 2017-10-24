import { Router, Request, Response } from 'express';
import { Database } from './database';
import { createToken } from './jwt';
import { AuthenticationResult } from './../src/app/security/AuthenticationResult';
const bcrypt: any = require('bcrypt');

const router = Router();
const client = new Database();

interface AuthData {
    username: string;
    password: string;
}

function checkPassword(plainTextPassword: string, hashedPassword: string): Promise<void> {
    return bcrypt //
        .compare(plainTextPassword, hashedPassword)
        .then(function(res: boolean) {
            if (res === true) {
                return;
            } else {
                throw new Error('Passwords do not match');
            }
        });
}

router.post('/', (req, resp) => {
    const authData: AuthData = req.body;
    let result: AuthenticationResult = null;

    console.log(`got authentication request ${authData.username}`);

    if (!authData || !authData.username || !authData.password) {
        resp.status(400).send('Benutzername oder Password nicht korrekt.');
    } else {
        client
            .getUser(authData.username)
            .then(user => {
                console.log(`found user`);

                return checkPassword(authData.password, user.password) //
                    .then(() => {
                        const token = createToken(user._id, user.name, user.roles);

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
