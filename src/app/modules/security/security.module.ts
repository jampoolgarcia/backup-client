import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SecurityRoutingModule } from './security-routing.module';

/** Shared Modules */
import { SharedModule } from '../../shared/shared.module';

/** Components */
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditComponent } from './components/edit/edit.component';




@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    ResetComponent, 
    ProfileComponent, 
    UserListComponent, 
    ChangePasswordComponent, 
    EditComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent, 
    RegisterComponent,
    ResetComponent,
    ProfileComponent,
    UserListComponent,
    ChangePasswordComponent
  ]
})
export class SecurityModule { }
