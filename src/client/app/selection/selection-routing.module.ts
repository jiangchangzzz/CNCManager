import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionComponent } from './selection.component';
import { CNCMachineComponent, CNCTypeComponent, ConditionComponent } from './CNCMachine/index';
import { CNCSystemComponent,SystemTypeComponent,SystemAccessoryComponent } from './CNCSystem/index';
import { FeedSystemComponent,BallscrewComponent,BearingComponent,CouplingComponent,DriverComponent,GuideComponent,MotorComponent } from './feed-system/index';

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
      },
      {
        path: 'feedSystem/:feed',
        component: FeedSystemComponent,
        children: [
          {
            path: '',
            redirectTo: 'guide',
            pathMatch: 'full'
          },
          {
            path: 'guide',
            component: GuideComponent
          },
          {
            path: 'ballscrew',
            component: BallscrewComponent
          },
          {
            path: 'bearing',
            component: BearingComponent
          },
          {
            path: 'coupling',
            component: CouplingComponent
          },
          {
            path: 'motor',
            component: MotorComponent
          },
          {
            path: 'driver',
            component: DriverComponent
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