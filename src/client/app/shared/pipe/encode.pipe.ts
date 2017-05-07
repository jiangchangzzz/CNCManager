import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name: 'encode',
    pure: true
})
export class EncodePipe implements PipeTransform{
    transform(str: string): string{
        return encodeURIComponent(str);
    }
}