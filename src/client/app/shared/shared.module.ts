import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LocalStorageService } from './service/index';
import { SizePipe,OrderByPipe,EncodePipe } from './pipe/index';
import { OrderIconDirective } from './directive/index';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule,ReactiveFormsModule,HttpModule,ModalModule.forRoot()],
  declarations: [
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    SizePipe,
    OrderByPipe,
    EncodePipe,
    OrderIconDirective
  ],
  exports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule,
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    SizePipe,
    OrderByPipe,
    EncodePipe,
    OrderIconDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [LocalStorageService]
    };
  }
}
