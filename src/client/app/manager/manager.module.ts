import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';

@NgModule({
    imports: [CommonModule,FormsModule,SharedModule,ManagerRoutingModule],
    exports: [],
    declarations: [ManagerComponent],
    providers: [],
})
export class ManagerModule { }
