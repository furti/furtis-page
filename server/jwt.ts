import { User } from './../src/app/security/User';
import { Request, Response } from 'express';
import { createHmac } from 'crypto';

const secret = process.env.JWT_SECRET;

if (!secret) {
    console.log(`Missing jwt secret. Use export 'JWT_SECRET=<secret>'`);
    throw new Error(`Missing jwt secret. Use export 'JWT_SECRET=<secret>'`);
}

export interface AuthenticatedRequest extends Request {
    user: Authentication;
}

export class Authentication implements User {
    constructor(public sub: string, public roles: string[], public exp: number, public name: string) {}

    hasAnyRole(roles: string[]): boolean {
        if (!roles || roles.length === 0) {
            return true;
        }

        if (!this.roles || this.roles.length === 0) {
            return false;
        }

        const filteredRoles = roles.filter(role => this.roles.indexOf(role) >= 0);

        return filteredRoles.length >= 1;
    }
}

function parseToken(token: string): Authentication {
    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error(`Got invalid token ${token}`);
    }

    const actualSignature = createSignature(parts[0], parts[1]);

    if (actualSignature !== parts[2]) {
        throw new Error('Signature does not match');
    }

    const decodedUser = Buffer.from(parts[1], 'base64').toString('utf8');
    console.log(decodedUser);
    const parsedUser = JSON.parse(decodedUser);

    if (!parsedUser.exp || parsedUser.exp < new Date().getTime()) {
        throw new Error('Authentication expired');
    }

    return new Authentication(parsedUser.sub, parsedUser.roles, parsedUser.exp, parsedUser.name);
}

export function createSignature(base64Header: string, base64Payload: string): string {
    const hmac = createHmac('sha256', secret);

    hmac.update(`${base64Header}.${base64Payload}`);

    return hmac.digest('base64');
}

export function isAuthenticated(request: AuthenticatedRequest, response: Response, next: any): void {
    const token = request.header('Authorization');

    if (!token || token.trim().length === 0) {
        console.log('No token');

        response.status(401).send('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');

        return;
    }

    try {
        request.user = parseToken(token);
    } catch (e) {
        console.log(`Got Error while parsing`, e.message);
        response.status(401).send('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');

        return;
    }

    next();
}

export function createToken(sub: string, name: string, roles: string[]): string {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    let millis = new Date().getTime();
    millis += 3600 * 8 * 1000;

    const payload = {
        sub,
        name,
        roles,
        exp: millis
    };

    const headerAsBase64 = Buffer.from(JSON.stringify(header)).toString('base64');
    const payloadAsBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = createSignature(headerAsBase64, payloadAsBase64);

    return `${headerAsBase64}.${payloadAsBase64}.${signature}`;
}
