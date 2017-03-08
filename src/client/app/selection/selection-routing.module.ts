import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionComponent } from './selection.component';
import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './CNCMachine/index';
import { CNCSystemComponent,SystemTypeComponent,SystemAccessoryComponent } from './CNCSystem/index';

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
      },
      {
        path: 'CNCSystem',
        component: CNCSystemComponent,
        children: [
          {
            path: '',
            redirectTo: 'systemType',
            pathMatch: 'full'
          },
          {
            path: 'systemType',
            component: SystemTypeComponent
          },
          {
            path: 'systemAccessory',
            component: SystemAccessoryComponent
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