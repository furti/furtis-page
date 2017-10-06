import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fuudate'
})
export class FuuDatePipe implements PipeTransform
{

    transform(value: string, args?: any): any
    {
        let splitted = value.split('-');

        splitted = splitted.reverse();

        return splitted.join('.');
    }

}
