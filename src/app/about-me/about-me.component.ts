import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ErrorHandler } from './../error-handler.service';
import { Section } from './../Section';

@Component({
    selector: 'fuu-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit
{
    sections: Section[];

    constructor(private httpClient: HttpClient, private errorHandler: ErrorHandler) { }

    ngOnInit()
    {
        this.httpClient.get('/api/sections')
            .subscribe(data =>
            {
                this.sections = data['data'] as Section[];
            }, (err: HttpErrorResponse) =>
            {
                this.errorHandler.handleError(err);
            });
    }

}
