/** core angular modules */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** components */
import { LayoutModule } from './layouts/layout/layout.module';
import { SecurityModule } from './security/security.module';
import { DoctorModule } from './doctor/doctor.module';



@NgModule({
  declarations: [],
  imports: [
    // core angular modules
    CommonModule,
    RouterModule,

    // modules app
    LayoutModule,
    SecurityModule,
    DoctorModule
  ]
})
export class ModulesModule { }
