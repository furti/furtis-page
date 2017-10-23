import { Section } from './../data/Section';
import { Component, OnInit, Input } from '@angular/core';

import { SecurityService } from '../security/security.service';

@Component({
    selector: 'fuu-section-card',
    templateUrl: './section-card.component.html',
    styleUrls: ['./section-card.component.css']
})
export class SectionCardComponent implements OnInit
{

    @Input()
    section: Section;

    authenticationRequired: boolean;

    constructor(private securityService: SecurityService) { }

    ngOnInit()
    {
        if (this.section.authenticationRequired && !this.securityService.isAuthenticated())
        {
            this.authenticationRequired = true;
        }
    }
}
