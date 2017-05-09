import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { AuthGuard } from '../user/service/index';

const routes: Routes = [
  { 
      path: 'manager', 
      component: ManagerComponent,
      canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }

export const routedComponents = [ManagerComponent];