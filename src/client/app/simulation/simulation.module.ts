import { NgModule } from '@angular/core';

import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationComponent } from './simulation.component';

@NgModule({
    imports: [SimulationRoutingModule],
    exports:[],
    declarations: [SimulationComponent]
})
export class SimulationModule{

}