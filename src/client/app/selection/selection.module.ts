import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';

import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './CNCMachine/index';
import { CNCSystemComponent,SystemTypeComponent,SystemAccessoryComponent } from './CNCSystem/index';
import { NonnegativeValidator } from './directive/index';


@NgModule({
    imports: [CommonModule,FormsModule,SelectionRoutingModule],
    exports: [],
    declarations: [
        SelectionComponent,
        CNCMachineComponent,
        CNCTypeComponent,
        ConditionComponent,
        CNCSystemComponent,
        SystemTypeComponent,
        SystemAccessoryComponent,
        NonnegativeValidator]
})
export class SelectionModule{

}