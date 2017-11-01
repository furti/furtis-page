import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fuudate'
})
export class FuuDatePipe implements PipeTransform {
    transform(value: string, args?: any): any {
        if (!value) {
            return 'Heute';
        }

        let splitted = value.split('-');

        // Remove the day. Don't need to display this
        if (splitted.length === 3) {
            splitted.length = 2;
        }

        splitted = splitted.reverse();

        return splitted.join('.');
    }
}
