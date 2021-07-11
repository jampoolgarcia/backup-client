import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../../../shared/shared.module';
import { SecurityModule } from '../../security/security.module';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    SharedModule,
    SecurityModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
