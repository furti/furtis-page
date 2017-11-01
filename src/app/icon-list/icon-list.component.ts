import { IconListContent } from './../data/IconListContent';
import { Section } from './../data/Section';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fuu-icon-list',
    templateUrl: './icon-list.component.html',
    styleUrls: ['./icon-list.component.css']
})
export class IconListComponent {
    @Input() section: Section<IconListContent>;

    constructor() {}
}
