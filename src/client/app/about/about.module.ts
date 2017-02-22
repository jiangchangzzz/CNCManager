import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'ng2-bootstrap/accordion';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
    imports: [CommonModule, AboutRoutingModule, AccordionModule.forRoot()],
    exports: [],
    declarations: [AboutComponent]
})
export class AboutModule{

}

