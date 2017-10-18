import { Section } from './../data/Section';
import { Component, OnInit, Input } from '@angular/core';

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

    constructor() { }

    ngOnInit()
    {
        if (this.section.authenticationRequired)
        {
            this.authenticationRequired = true;
        }
    }

}
