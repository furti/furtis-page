import { Injectable } from '@angular/core';

import { TokenHeader } from './TokenHeader';
import { User } from './User';

@Injectable()
export class SecurityService {
    private _token: string;
    private user: User;

    constructor() {
        this.loadTokenFromStorage();
    }

    get token(): string {
        return this._token;
    }

    set token(token: string) {
        console.log('Got token', token);

        this._token = token;

        this.parseToken(this._token);
        this.saveTokenInStorage(this._token);
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

    getUser(): User {
        return this.user;
    }

    logout(): void {
        this._token = null;
        this.user = null;

        localStorage.removeItem('authToken');
    }

    private parseToken(token: string): void {
        const parts = token.split('.');
        const encodedUser = parts[1];
        const decodedUser = atob(encodedUser);

        this.user = JSON.parse(decodedUser);

        if (this.user.exp < new Date().getTime()) {
            this._token = null;
            this.user = null;
        }
    }

    private loadTokenFromStorage(): void {
        this._token = localStorage.getItem('authToken');

        if (this._token) {
            this.parseToken(this._token);
        }
    }

    private saveTokenInStorage(token: string): void {
        localStorage.setItem('authToken', token);
    }
}
