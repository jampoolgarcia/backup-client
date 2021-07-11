import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layouts/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'security', 
    loadChildren: () => import('./modules/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  },
  { 
    path: '', 
    pathMatch: 
    'full', 
    redirectTo: '/home'
  }, 
  { 
    path: '**', 
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
