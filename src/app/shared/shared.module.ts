

/** core angular modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


/** material angular module */
import { MaterialModule } from './module/material.module';

/** external modules */
import { NgxSpinnerModule } from "ngx-spinner";

/** pipes module */
import { PipesModule } from './pipes/pipes.module';

/** components */
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { CardPersonComponent } from './components/card-person/card-person.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReportComponent } from './components/report/report.component';
import { ModalImageComponent } from './components/modal-image/modal-image.component';
import { FormFieldCustomControlExample, MyTelInput } from './components/example-tel-input/example-tel-input.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectInputFieldComponent } from './components/mat-select-input-field/mat-select-input-field.component';

@NgModule({
  declarations: [
    /**  components */
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    MenuComponent,
    CardPersonComponent,
    SpinnerComponent,
    LogoutComponent,
    HomeComponent,
    NotFoundComponent,
    ReportComponent,
    ModalImageComponent,
    FormFieldCustomControlExample, 
    MyTelInput, 
    MatSelectInputFieldComponent,
  ],
  imports: [
    /** core angular modules */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    /** material angular modules */
    MaterialModule,

    /** external modules */
    NgxSpinnerModule,

    /** pipes module */
    PipesModule
  ], 
  exports: [
    /** core angular modules */
    FormsModule,
    ReactiveFormsModule,

    /** material angular modules */
    MaterialModule,

    /** external modules */
    NgxSpinnerModule,

    /** pipes module */
    PipesModule,

     /**  components */
     TopbarComponent,
     SidebarComponent,
     FooterComponent,
     SpinnerComponent,
     LogoutComponent,
     HomeComponent,
     ReportComponent,
     ModalImageComponent,
     FormFieldCustomControlExample, 
     MyTelInput,
     MatSelectInputFieldComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { } },
  ]
})
export class SharedModule { }
