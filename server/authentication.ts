import { Router, Request, Response } from 'express';
import { Database } from './database';
import { isAuthenticated, AuthenticatedRequest } from './jwt';
import { AuthenticationResult } from './../src/app/security/AuthenticationResult';

const router = Router();
const client = new Database();

interface AuthData {
    username: string;
    password: string;
}

router.post('/', (req, resp) => {
    const authData: AuthData = req.body;
    let result: AuthenticationResult = null;

    if (!authData || !authData.username || !authData.password) {
        resp.status(400).send('Benutzername oder Password nicht korrekt.');
    } else {
        client
            .getUser(authData.username)
            .then(user => {})
            .catch(error => {
                resp.status(400).send('Benutzername oder Password nicht korrekt.');
            });
    }
});

module.exports = router;
