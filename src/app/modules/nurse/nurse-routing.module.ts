import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsNurseComponent } from './pages/details-nurse/details-nurse.component';
import { ListNurseComponent } from './pages/list-nurse/list-nurse.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListNurseComponent
  },
  {
    path: 'details/:id',
    component: DetailsNurseComponent
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
export class NurseRoutingModule { }
