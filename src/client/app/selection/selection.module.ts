import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';

import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './CNCMachine/index';
import { CNCSystemComponent,SystemTypeComponent,SystemAccessoryComponent } from './CNCSystem/index';
import { NonnegativeValidator } from './directive/index';

import { DefaultService } from './service/index';

@NgModule({
    imports: [CommonModule,FormsModule,SharedModule,SelectionRoutingModule],
    exports: [],
    declarations: [
        SelectionComponent,
        CNCMachineComponent,
        CNCTypeComponent,
        ConditionComponent,
        CNCSystemComponent,
        SystemTypeComponent,
        SystemAccessoryComponent,
        NonnegativeValidator],
    providers: [
        DefaultService
    ]
})
export class SelectionModule{

}