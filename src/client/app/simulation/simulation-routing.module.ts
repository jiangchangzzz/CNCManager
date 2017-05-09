import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulationComponent } from './simulation.component';
import { AuthGuard } from '../user/service/index';

const routes: Routes=[
    {
        path: 'simulation',
        component: SimulationComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimulationRoutingModule{

}