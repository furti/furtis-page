"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const secret = `:'~n0Ft"3K7@mSf=DK!bOnmX"6fflGQSaN\-6tUd-c#2BoF8hP`;
class Authentication {
    constructor(sub, roles, exp, name) {
        this.sub = sub;
        this.roles = roles;
        this.exp = exp;
        this.name = name;
    }
    hasAnyRole(roles) {
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
exports.Authentication = Authentication;
function parseToken(token) {
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
function createSignature(base64Header, base64Payload) {
    const hmac = crypto_1.createHmac('sha256', secret);
    hmac.update(`${base64Header}.${base64Payload}`);
    return hmac.digest('base64');
}
exports.createSignature = createSignature;
function isAuthenticated(request, response, next) {
    const token = request.header('Authorization');
    if (!token || token.trim().length === 0) {
        console.log('No token');
        response.status(401).send('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
        return;
    }
    try {
        request.user = parseToken(token);
    }
    catch (e) {
        console.log(`Got Error while parsing`, e.message);
        response.status(401).send('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
        return;
    }
    next();
}
exports.isAuthenticated = isAuthenticated;
function createToken(sub, name, roles) {
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
exports.createToken = createToken;
