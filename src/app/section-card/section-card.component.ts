import { Section } from './../data/Section';
import { Component, OnInit, Input } from '@angular/core';

import { SecurityService } from '../security/security.service';

@Component({
    selector: 'fuu-section-card',
    templateUrl: './section-card.component.html',
    styleUrls: ['./section-card.component.css']
})
export class SectionCardComponent implements OnInit {
    @Input() section: Section;

    authenticationRequired: boolean;
    forbidden: boolean;

    constructor(private securityService: SecurityService) {}

    ngOnInit() {
        if (
            this.section.requiredRoles &&
            this.section.requiredRoles.length > 0 &&
            !this.securityService.isAuthenticated()
        ) {
            this.authenticationRequired = true;
        }

        if (!this.authenticationRequired && !this.securityService.hasAnyRole(this.section.requiredRoles)) {
            this.forbidden = true;
        }
    }
}
