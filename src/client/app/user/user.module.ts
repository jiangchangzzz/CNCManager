import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.component';
import { UserRegisterComponent,UserLoginComponent,ForgetPwdComponent } from './index';
import { EqualValidator } from './directive/equal-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
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