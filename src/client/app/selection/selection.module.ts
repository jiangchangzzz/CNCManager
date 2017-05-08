import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';

import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './CNCMachine/index';
import { CNCSystemComponent,SystemTypeComponent,SystemAccessoryComponent } from './CNCSystem/index';
import { FeedSystemComponent,BallscrewComponent,BearingComponent,CouplingComponent,DriverComponent,GuideComponent,MotorComponent } from './feed-system/index';
import { NonnegativeValidator } from './directive/index';
import { DefaultService,CNCTypeService } from './service/index';
import { SystemTypePipe } from './pipe/index';

@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule,SharedModule,SelectionRoutingModule],
    exports: [],
    declarations: [
        SelectionComponent,
        CNCMachineComponent,
        CNCTypeComponent,
        ConditionComponent,
        CNCSystemComponent,
        SystemTypeComponent,
        SystemAccessoryComponent,
        FeedSystemComponent,
        BallscrewComponent,
        BearingComponent,
        CouplingComponent,
        DriverComponent,
        GuideComponent,
        MotorComponent,
        NonnegativeValidator,
        SystemTypePipe],
    providers: [
        DefaultService,
        CNCTypeService
    ]
})
export class SelectionModule{

}