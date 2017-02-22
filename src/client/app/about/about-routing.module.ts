import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

const routes: Routes=[
    {
        path: 'about',
        component: AboutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule{

}

