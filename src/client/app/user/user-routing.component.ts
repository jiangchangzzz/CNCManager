import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRegisterComponent,UserLoginComponent,ForgetPwdComponent } from './index';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [UserRegisterComponent,UserLoginComponent];