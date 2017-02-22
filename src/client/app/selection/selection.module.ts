import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';

@NgModule({
    imports: [CommonModule,SelectionRoutingModule],
    exports: [],
    declarations: [SelectionComponent]
})
export class SelectionModule{

}