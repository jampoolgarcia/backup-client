import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import Swal from 'sweetalert2';
import { SecurityService } from '../../../../shared/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  fgv: FormGroup;

  constructor(
    private router: Router, 
    private _alertService: AlertService, 
    private formBuilder: FormBuilder, 
    private _security: SecurityService
    ) {
    this.fgv = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit() {

  }

  onSubmit(value) {

    this._security.login(value.userName, value.password)
      .subscribe(
        data => {
          console.log("saveSession", this._security.saveSession(data));
          this._alertService.showConfirmationMessage('Bienvenido...', '')  
            .then(result => {
              console.log('then')
              this.fgv.reset();
              this.router.navigate(['/']);
            });
        },
        err => {
          this._alertService.showErr(err);
        }
       

      );
  
  }

}
