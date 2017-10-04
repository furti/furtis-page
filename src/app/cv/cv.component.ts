import { CVContent } from './../data/CVContent';
import { Section } from './../data/Section';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fuu-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit
{
    @Input()
    section: Section<CVContent>;

    constructor() { }

    ngOnInit()
    {
    }

}
