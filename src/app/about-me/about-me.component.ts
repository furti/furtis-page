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
                let sectionArray = data['data'] as Section[];

                sectionArray = sectionArray.sort((s1, s2) =>
                {
                    return s1.sortOrder - s2.sortOrder;
                });

                this.sections = sectionArray;
            }, (err: HttpErrorResponse) =>
            {
                this.errorHandler.handleError(err);
            });
    }

}
