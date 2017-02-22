import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { SelectionModule } from './selection/selection.module';
import { SimulationModule } from './simulation/simulation.module';

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, SharedModule.forRoot(),
    HomeModule,
    AboutModule,
    SelectionModule,
    SimulationModule
    ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
