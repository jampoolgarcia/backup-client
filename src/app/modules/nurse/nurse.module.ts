import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { ListNurseComponent } from './pages/list-nurse/list-nurse.component';
import { DetailsNurseComponent } from './pages/details-nurse/details-nurse.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ListNurseComponent, DetailsNurseComponent],
  imports: [
    CommonModule,
    NurseRoutingModule,
    SharedModule
  ]
})
export class NurseModule { }
