import { Section } from '../data/Section';
import { SectionService } from './../section.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'fuu-section-detail',
    templateUrl: './section-detail.component.html',
    styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit
{
    section: Section;

    constructor(private route: ActivatedRoute, private sectionService: SectionService) { }

    ngOnInit()
    {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
            {
                const sectionId = params.get('sectionId');

                return this.sectionService.getSection(sectionId);
            })
            .subscribe(section => this.section = section);
    }

}
