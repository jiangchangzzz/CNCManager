import { Directive, Input, ElementRef } from '@angular/core';

@Directive({ selector: '[orderIcon]' })
export class OrderIconDirective {
    private el: HTMLElement;

    @Input('orderIcon')
    set show(order: string){
        if(!order){
            return;
        }
        
        if(order.slice(1)===this.head){
            if(order[0]==='+'){
                this.el.className="glyphicon glyphicon-chevron-up";
            }
            else if(order[0]==='-'){
                this.el.className="glyphicon glyphicon-chevron-down";
            }
        }
        else{
            this.el.className='';
        }
    }

    @Input()
    head: string;

    constructor(el: ElementRef) {
        this.el=el.nativeElement;
    }
}
