import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionComponent } from './selection.component';
import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './shared/CNCMachine/index';

const routes: Routes = [
  { 
    path: 'selection', 
    component: SelectionComponent,
    children:[
      {
        path: '',
        redirectTo: 'CNCMachine',
        pathMatch: 'full'
      },
      {
        path: 'CNCMachine',
        component: CNCMachineComponent,
        children: [
          {
            path: '',
            redirectTo: 'CNCType',
            pathMatch: 'full'
          },
          {
            path: 'CNCType',
            component: CNCTypeComponent
          },
          {
            path: 'condition',
            component: ConditionComponent
          }
        ]
      }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectionRoutingModule { }

export const routedComponents = [SelectionComponent];