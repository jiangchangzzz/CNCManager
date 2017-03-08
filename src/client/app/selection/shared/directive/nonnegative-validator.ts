import {AbstractControl} from '.2.4.8@@angular/forms';
import {NG_VALIDATORS, Validator} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[nonnegative]',
    providers: [{provide: NG_VALIDATORS, useExisting: NonnegativeValidator, multi: true}]
})
export class NonnegativeValidator implements Validator{

   validate(control: AbstractControl): {[key: string]: any} {
       return {
           valid: true
       }
   }
}
 
const NON_REGEXP=new RegExp('^\d+(\.\d+)?$');
