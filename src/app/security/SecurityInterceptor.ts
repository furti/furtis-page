import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SecurityService } from './security.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
    private securityService: SecurityService;

    constructor(inj: Injector) {
        // Workaraound until https://github.com/angular/angular/issues/18224 is fixed
        this.securityService = inj.get(SecurityService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Adds the Authorization Header to /api requests only
        // if (this.securityService.isAuthenticated() && req.url.indexOf('/api') !== -1) {
        //     const authToken = this.securityService.token;

        //     // Clone the request to add the new header.
        //     req = req.clone({ headers: req.headers.set('Authorization', authToken) });
        // }

        return next.handle(req);
    }
}
