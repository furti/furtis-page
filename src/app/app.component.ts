import { Component } from '@angular/core';

import { SecurityService } from './security/security.service';

@Component({
    selector: 'fuu-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private securityService: SecurityService) {}

    getUserName(): string {
        const user = this.securityService.getUser();

        if (!user) {
            return null;
        }

        return user.name;
    }

    logout(): void {
        this.securityService.logout();
    }
}
