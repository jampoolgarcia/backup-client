/** core modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** router */
import { DoctorRoutingModule } from './doctor-routing.module';

/** external modules */
import { SharedModule } from 'src/app/shared/shared.module';


/** components */
import { DetailsDoctorComponent } from './pages/details-doctor/details-doctor.component';
import { FormDoctorComponent } from './pages/form-doctor/form-doctor.component';
import { ListDoctorComponent } from './pages/list-doctor/list-doctor.component';
import { ReportListComponent } from './pages/report-list/report-list.component';
import { SpecialtyComponent } from './components/specialty/specialty.component';



@NgModule({
  declarations: [ 
    ListDoctorComponent, 
    FormDoctorComponent, 
    SpecialtyComponent, 
    DetailsDoctorComponent, 
    ReportListComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
