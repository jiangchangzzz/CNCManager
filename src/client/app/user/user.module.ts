import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.component';
import { UserRegisterComponent,UserLoginComponent,ForgetPwdComponent } from './index';
import { EqualValidator } from './directive/equal-validator.directive';

@NgModule({
    imports: [
        SharedModule,
        UserRoutingModule],
    exports: [],
    declarations: [
        UserRegisterComponent,
        UserLoginComponent,
        ForgetPwdComponent,
        EqualValidator],
    providers: [],
})
export class UserModule { }