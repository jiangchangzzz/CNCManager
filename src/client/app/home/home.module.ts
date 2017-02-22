import { NgModule } from '@angular/core';

import { CarouselModule } from 'ng2-bootstrap/carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        HomeRoutingModule,
        CarouselModule.forRoot()
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule{

}
