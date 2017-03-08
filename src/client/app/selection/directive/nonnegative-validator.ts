import { Directive } from '@angular/core';
import { Validator,AbstractControl,NG_VALIDATORS } from '@angular/forms';

/**
 * 非负数验证器
 * 
 * @export
 * @class NonnegativeValidator
 * @implements {Validator}
 */
@Directive({
    selector: '[nonnegative]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: NonnegativeValidator, multi: true }
    ]
})
export class NonnegativeValidator implements Validator{
    validate(control: AbstractControl): { [key: string]: any }{
        const NONNEGATIVE_REGEXP=new RegExp('^\\d*(\\.\\d*)?$');
        let value=control.value;
        let res=NONNEGATIVE_REGEXP.test(value);
        return res ? null : { nonnegative: true};
    }
}