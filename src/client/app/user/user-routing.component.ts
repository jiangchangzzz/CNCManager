import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRegisterComponent,UserLoginComponent,ForgetPwdComponent,UserCenterComponent } from './index';

const routes: Routes = [
  { 
      path: 'register', 
      component: UserRegisterComponent 
  },
  {
      path: 'login',
      component: UserLoginComponent
  },
  {
      path: 'forgetpwd',
      component: ForgetPwdComponent
  },
  {
      path: 'center',
      component: UserCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }