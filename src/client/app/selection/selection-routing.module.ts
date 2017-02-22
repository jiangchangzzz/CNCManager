import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionComponent } from './selection.component';

const routes: Routes = [
  { 
    path: 'selection', 
    component: SelectionComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectionRoutingModule { }

export const routedComponents = [SelectionComponent];