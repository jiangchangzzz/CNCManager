import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'size',
    pure: false
})

export class SizePipe implements PipeTransform {
    transform(value: any[]): number {
        return value.length;
    }
}