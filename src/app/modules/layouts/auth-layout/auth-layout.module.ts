import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule
  ]
})
export class AuthLayoutModule { }
