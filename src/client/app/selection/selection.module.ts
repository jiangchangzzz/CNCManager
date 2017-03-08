import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';

import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './shared/CNCMachine/index';
import { NonnegativeValidator } from './shared/directive/nonnegative-validator';


@NgModule({
    imports: [CommonModule,FormsModule,SelectionRoutingModule],
    exports: [],
    declarations: [
        SelectionComponent,
        CNCMachineComponent,
        CNCTypeComponent,
        ConditionComponent,
        NonnegativeValidator]
})
export class SelectionModule{

}