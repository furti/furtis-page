import { Request, Response } from 'express';

export interface AuthenticatedRequest extends Request
{
    user: User;
}

export class User
{
    constructor(public id: string, public roles: string[]) { }

    hasAnyRole(roles: string[]): boolean
    {
        if (!roles || roles.length === 0)
        {
            return true;
        }

        if (!this.roles || this.roles.length === 0)
        {
            return false;
        }

        const filteredRoles = roles.filter(role => this.roles.indexOf(role) >= 0);

        return filteredRoles.length >= 1;
    }
}

export function isAuthenticated(request: AuthenticatedRequest, response: Response, next: any): void
{
    const token = request.header('Authorization');

    console.log('got token', token);

    if (!token || token.trim().length === 0)
    {
        console.log('NO token');

        response.status(401).send('Um auf die Daten zuzugreifen, ist eine Anmeldung erforderlich.');

        return;
    }

    request.user = new User('1', []);

    next();
}
