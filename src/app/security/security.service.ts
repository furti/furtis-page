import { Injectable } from '@angular/core';

import { TokenHeader } from './TokenHeader';
import { User } from './User';

@Injectable()
export class SecurityService {
    private _token: string;
    private user: User;

    constructor() {}

    get token(): string {
        return this._token;
    }

    set token(token: string) {
        const parts = token.split('.');
        const encodedUser = parts[1];
        const decodedUser = atob(encodedUser);

        this._token = token;
        this.user = JSON.parse(decodedUser);
    }

    isAuthenticated(): boolean {
        if (!this.user) {
            return false;
        }

        return true;
    }

    hasAnyRole(roles: string[]): boolean {
        if (!roles || roles.length === 0) {
            return true;
        }

        if (!this.user || !this.user.roles || this.user.roles.length === 0) {
            return false;
        }

        const filteredRoles = roles.filter(role => this.user.roles.indexOf(role) >= 0);

        return filteredRoles.length > 0;
    }
}
