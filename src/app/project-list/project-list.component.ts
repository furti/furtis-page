import { ProjectListContent } from './../data/ProjectListContent';
import { Section } from './../data/Section';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fuu-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
    @Input() section: Section<ProjectListContent>;

    constructor() {}

    ngOnInit() {}
}
