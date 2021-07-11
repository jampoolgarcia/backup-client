import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPatientComponent } from './pages/details-patient/details-patient.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPatientComponent
  },
  {
    path: 'details/:id',
    component: DetailsPatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
