import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsDoctorComponent } from './pages/details-doctor/details-doctor.component';
import { FormDoctorComponent } from './pages/form-doctor/form-doctor.component';
import { ListDoctorComponent } from './pages/list-doctor/list-doctor.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListDoctorComponent
  },
  {
    path: 'details/:id',
    component: DetailsDoctorComponent
  },
  {
    path: 'form/:id',
    component: FormDoctorComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
