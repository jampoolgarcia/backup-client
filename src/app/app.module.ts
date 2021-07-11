/** core angular modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/** this rauting */
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';

/** root component */
import { AppComponent } from './app.component';

/** pricipal modules */
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    //** root component */
    AppComponent,
  ],
  imports: [
    //** core modules */
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,

    //** principal modules */
    ModulesModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
