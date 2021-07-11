import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { UserListComponent } from '../../security/pages/user-list/user-list.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home'},
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'userList',
        component: UserListComponent
      },
      {
        path: 'doctor',
        loadChildren: () => import('../../doctor/doctor.module').then(m => m.DoctorModule),
      },
      {
        path: 'nurse',
        loadChildren: () => import('../../nurse/nurse.module').then(m => m.NurseModule),
      },
      {
        path: 'patient',
        loadChildren: () => import('../../patient/patient.module').then(m => m.PatientModule),
      },
      {
        path: 'medicine',
        loadChildren: () => import('../../medicine/medicine.module').then(m => m.MedicineModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
