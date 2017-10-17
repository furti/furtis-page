import { Component, OnInit } from '@angular/core';

import { ErrorHandler } from './../error-handler.service';

@Component({
    selector: 'fuu-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit
{
    additionalMessage: string;

    constructor(private errorHandler: ErrorHandler) { }

    ngOnInit()
    {
        if (this.errorHandler.lastError)
        {
            this.additionalMessage = this.errorHandler.lastError.error;
        }

        delete this.errorHandler.lastError;
    }
}
