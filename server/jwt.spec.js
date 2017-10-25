const jwt = require('./jwt');

function TestRequest(token) {
    this.token = token;
}

TestRequest.prototype.header = function(headerName) {
    if (headerName === 'Authorization') {
        return this.token;
    }
};

function TestResponse() {}

TestResponse.prototype.status = function(status) {
    this._status = status;

    return this;
};

TestResponse.prototype.send = function(body) {
    this._body = body;

    return this;
};

let nextFunctionCalled = null;
let response = null;

function next() {
    nextFunctionCalled = true;
}

function createToken(validExp, invalidateHeader, invalidatePayload) {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    const payload = {
        sub: 'TESTUSER',
        exp: validExp ? new Date().getTime() + 3600 : new Date().getTime() - 1,
        name: 'John Doe',
        roles: ['some', 'roles']
    };

    const headerAsString = JSON.stringify(header);
    const payloadAsString = JSON.stringify(payload);

    let base64Header = Buffer.from(headerAsString).toString('base64');
    let base64Payload = Buffer.from(payloadAsString).toString('base64');
    const signature = jwt.createSignature(base64Header, base64Payload);

    if (invalidateHeader) {
        header.alg = 'none';

        base64Header = Buffer.from(JSON.stringify(header)).toString('base64');
    }

    if (invalidatePayload) {
        payload.roles = ['admin'];

        base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    }

    return base64Header + '.' + base64Payload + '.' + signature;
}

describe('JWT', () => {
    beforeEach(() => {
        nextFunctionCalled = false;
        response = new TestResponse();
    });

    it('not authenticated on undefined token', () => {
        const request = new TestRequest();

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('not authenticated on empty token', () => {
        const request = new TestRequest('');

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('not authenticated on blank token', () => {
        const request = new TestRequest('    \n \r');

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('not authenticated on too short token', () => {
        const request = new TestRequest('AAABBBCCC.DDDEEEFFF');

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('not authenticated on too long token', () => {
        const request = new TestRequest('AAABBBCCC.DDDEEEFFF.GGG.HHH');

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('not authenticated on invalid header', () => {
        const request = new TestRequest(createToken(true, true, false));

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('not authenticated on invalid payload', () => {
        const request = new TestRequest(createToken(true, false, true));

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('not authenticated on invalid expires', () => {
        const request = new TestRequest(createToken(false, false, false));

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeUndefined();
        expect(nextFunctionCalled).toBe(false);
        expect(response._status).toBe(401);
        expect(response._body).toBe('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');
    });

    it('valid authentication', () => {
        const request = new TestRequest(createToken(true, false, false));

        jwt.isAuthenticated(request, response, next);

        expect(request.user).toBeDefined();
        expect(nextFunctionCalled).toBe(true);
        expect(response._status).toBeUndefined();
        expect(response._body).toBeUndefined();
    });

    it('should create a token', () => {
        const token = jwt.createToken('someone', 'Some User', ['Some', 'Roles']);

        const parts = token.split('.');

        expect(parts.length).toBe(3);
        expect(parts[2].trim().length).toBeGreaterThan(10);

        const header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf8'));
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));

        expect(header.alg).toBe('HS256');
        expect(header.typ).toBe('JWT');

        expect(payload.sub).toBe('someone');
        expect(payload.name).toBe('Some User');
        expect(payload.roles).toEqual(['Some', 'Roles']);
        expect(payload.exp).toBeGreaterThanOrEqual(new Date().getTime() + 3600 * 1000);
    });
});
