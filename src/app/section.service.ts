import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { ErrorHandler } from './error-handler.service';
import { Section } from './data/Section';

@Injectable()
export class SectionService
{

    constructor(private httpClient: HttpClient, private errorHandler: ErrorHandler) { }

    getSections(): Promise<Section[]>
    {
        return this.httpClient
            .get<Section[]>('/api/sections')
            .toPromise()
            .then(data =>
            {
                let sectionArray = data['data'] as Section[];

                sectionArray = sectionArray.sort((s1, s2) =>
                {
                    return s1.sortOrder - s2.sortOrder;
                });

                return sectionArray;
            })
            .catch((err: HttpErrorResponse) =>
            {
                this.errorHandler.handleError(err);

                throw err;
            });
    }

    getSection(sectionId: string): Promise<Section>
    {
        return this.httpClient
            .get(`/api/sections/${sectionId}`)
            .toPromise()
            .then(data =>
            {
                return data['data'] as Section;
            })
            .catch((err: HttpErrorResponse) =>
            {
                this.errorHandler.handleError(err);

                throw err;
            });
    }
}
