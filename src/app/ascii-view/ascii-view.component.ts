import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Ascii } from './Ascii';
import { basketball } from './frames/Basketball';


const asciis: Ascii[] = [
    basketball
];

@Component({
    selector: 'fuu-ascii-view',
    templateUrl: './ascii-view.component.html',
    styleUrls: ['./ascii-view.component.css']
})
export class AsciiViewComponent implements OnInit, OnDestroy
{
    @Input()
    code: string;

    actualFrame: string;

    private actual: Ascii;
    private actualFrameIndex: number;
    private startTime: number;
    private cancelling: boolean;

    constructor() { }

    ngOnInit()
    {
        console.log(this.code);

        this.actual = asciis.filter(ascii => ascii.key === this.code)[0];

        this.start();
    }

    ngOnDestroy(): void
    {
        this.stop();
    }

    public start(): void
    {
        this.cancelling = false;
        this.actualFrameIndex = 0;
        delete this.startTime;

        this.nextFrame();
    }

    public stop(): void
    {
        this.cancelling = true;
    }

    private nextFrame(): void
    {
        if (this.cancelling)
        {
            return;
        }

        requestAnimationFrame((timestamp) =>
        {
            if (!this.startTime)
            {
                this.startTime = timestamp;
                this.actualFrame = this.actual.frames[this.actualFrameIndex];
            }

            if (timestamp - this.startTime >= 500)
            {
                this.actualFrame = this.actual.frames[this.actualFrameIndex];

                this.startTime = timestamp;
                this.actualFrameIndex++;

                if (this.actualFrameIndex >= this.actual.frames.length)
                {
                    this.actualFrameIndex = 0;
                }
            }

            this.nextFrame();
        });
    }
}
