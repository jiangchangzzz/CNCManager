import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.component';
import { UserRegisterComponent,UserLoginComponent } from './index';

@NgModule({
    imports: [
        SharedModule,
        UserRoutingModule],
    exports: [],
    declarations: [
        UserRegisterComponent,
        UserLoginComponent],
    providers: [],
})
export class UserModule { }