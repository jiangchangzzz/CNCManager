import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.component';
import { UserRegisterComponent,UserLoginComponent,ForgetPwdComponent,UserCenterComponent } from './index';
import { UserService } from './service/user.service';
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
        UserCenterComponent,
        EqualValidator],
    providers: [],
})
export class UserModule { 
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [UserService]
    };
  }
}