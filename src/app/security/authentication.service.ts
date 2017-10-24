import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationResult } from './AuthenticationResult';
import { ErrorHandler } from '../error-handler.service';
import { SecurityService } from './security.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private httpClient: HttpClient,
        private securityService: SecurityService,
        private errorHandler: ErrorHandler
    ) {}

    authenticate(username: string, password: string): Observable<AuthenticationResult> {
        return this.httpClient
            .post<AuthenticationResult>('/authenticate', {
                username,
                password
            })
            .map(result => {
                this.securityService.token = result.token;

                return result;
            });
    }
}
