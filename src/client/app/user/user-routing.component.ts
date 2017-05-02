import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  { 
      path: 'register', 
      component: UserRegisterComponent 
  },
  {
      path: 'login',
      component: UserLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [UserRegisterComponent,UserLoginComponent];