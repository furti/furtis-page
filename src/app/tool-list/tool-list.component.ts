import { Section } from './../data/Section';
import { Component, OnInit, Input } from '@angular/core';

import { ToolListContent } from '../data/ToolListContent';

@Component({
    selector: 'fuu-tool-list',
    templateUrl: './tool-list.component.html',
    styleUrls: ['./tool-list.component.css']
})
export class ToolListComponent {
    @Input() section: Section<ToolListContent>;

    constructor() {}
}
