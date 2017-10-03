import { SectionService } from './../section.service';
import { Component, OnInit } from '@angular/core';

import { Section } from './../data/Section';

@Component({
    selector: 'fuu-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit
{
    sections: Section[];

    constructor(private sectionService: SectionService) { }

    ngOnInit()
    {
        this.sectionService
            .getSections()
            .then(sections => this.sections = sections);
    }

}
