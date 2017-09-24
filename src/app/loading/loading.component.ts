import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fuu-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit
{
    @Input()
    loadingText: string;

    constructor() { }

    ngOnInit()
    {
        if (!this.loadingText)
        {
            this.loadingText = 'Daten werden geladen...';
        }
        else
        {
            this.loadingText += '...';
        }
    }

}
