import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ErrorHandler } from './error-handler.service';
import { Section } from './data/Section';

@Injectable()
export class SectionService
{

    constructor(private httpClient: HttpClient, private errorHandler: ErrorHandler) { }

    getSections(): Observable<Section[]>
    {
        return this.httpClient
            .get<Section[]>('/api/sections')
            .map(data =>
            {
                data = data.sort((s1, s2) =>
                {
                    return s1.sortOrder - s2.sortOrder;
                });

                return data;
            })
            .catch(err =>
            {
                this.errorHandler.handleError(err);

                return Observable.throw(err);
            });
    }

    getSection(sectionId: string): Observable<Section>
    {
        return this.httpClient
            .get(`/api/sections/${sectionId}`)
            .map(data =>
            {
                return data['data'] as Section;
            })
            .catch((err: HttpErrorResponse) =>
            {
                this.errorHandler.handleError(err);

                return Observable.throw(err);
            });
    }
}
