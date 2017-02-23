import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';

import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './shared/CNCMachine/index';

@NgModule({
    imports: [CommonModule,SelectionRoutingModule],
    exports: [],
    declarations: [
        SelectionComponent,
        CNCMachineComponent,
        CNCTypeComponent,
        ConditionComponent]
})
export class SelectionModule{

}