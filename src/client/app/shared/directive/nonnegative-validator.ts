import {NG_VALIDATORS,FormControl} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[nonnegative]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateNonnegative, multi: true }
    ]
})
export class NonnegativeValidator{

}

const NON_REGEXP=new RegExp('^\d+(\.\d+)?$');
export function validateNonnegative(c: FormControl){
    return NON_REGEXP.test(c.value)?null : {
        nonnegative:{
            valid: false,
            errorMsg: '必需是非负数'
        }
    }
}