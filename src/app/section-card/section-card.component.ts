import { Section } from './../Section';
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

    constructor() { }

    ngOnInit()
    {
    }

}
