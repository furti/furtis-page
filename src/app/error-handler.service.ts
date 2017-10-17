import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class ErrorHandler
{
    lastError: HttpErrorResponse;

    constructor(private router: Router) { }

    handleError(err: HttpErrorResponse): void
    {
        // Some client side error occured
        if (err.error instanceof Error)
        {
            console.log('A client side error occured:', err.error);
            alert('Handle client side error');
        }
        else
        {
            this.lastError = err;

            switch (err.status)
            {
                case 401:
                    this.navigateTo('/unauthorized');
                    break;
                case 403:
                    this.navigateTo('/forbidden');
                    break;
                case 407:
                    this.navigateTo('/proxy');
                    break;
                default:
                    this.handleOthers(err);
            }
        }
    }

    private navigateTo(path: string): void
    {
        this.router.navigate([path]);
    }

    private handleOthers(err: HttpErrorResponse): void
    {
        this.router.navigate(['/error']);
    }
}
