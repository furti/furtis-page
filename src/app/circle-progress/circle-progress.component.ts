import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'fuu-circle-progress',
    templateUrl: './circle-progress.component.html',
    styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent implements OnInit, OnChanges {
    @Input() progress: number;

    normalizedProgress: number;
    progressClass: string;

    constructor() {}

    ngOnInit() {
        this.updateProgress();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateProgress();
    }

    private updateProgress(): void {
        window.setTimeout(() => {
            this.normalizedProgress = this.normalizeProgress();
            this.progressClass = `progress${this.normalizedProgress}`;
        }, 1);
    }

    private normalizeProgress(): number {
        const overflow = this.progress % 5;

        if (overflow <= 2) {
            return this.progress - overflow;
        } else {
            return this.progress + (5 - overflow);
        }
    }
}
