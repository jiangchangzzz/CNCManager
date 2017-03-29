import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LocalStorageService } from './service/index';
import { SizePipe,OrderByPipe } from './pipe/index';
import { OrderIconDirective } from './directive/index';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    SizePipe,
    OrderByPipe,
    OrderIconDirective
  ],
  exports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    SizePipe,
    OrderByPipe,
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
