import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { DetailsPatientComponent } from './pages/details-patient/details-patient.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DetailsPatientComponent, ListPatientComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
