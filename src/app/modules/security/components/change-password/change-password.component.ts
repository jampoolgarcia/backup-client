import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { validarNotEqueal} from 'src/app/shared/validator/app.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [
  ]
})
export class ChangePasswordComponent implements OnInit {

  public fgv: FormGroup; 

  constructor(private _service: SecurityService,private fb: FormBuilder, private _alertService: AlertService) { }

  ngOnInit(): void {
    this.buildingForm();
  }

  onSubmit(){
    let user = this._service.getCurrentUser();
    this._service.changePassword(user.id, this.oldPassword.value, this.password.value).subscribe(data =>{
      if(data){
        this._alertService.showConfirmationMessage('Registro', 'Su clave se a cambiado exitosamente.');
        this.fgv.reset();
      }
    }, err =>{
      console.log(err);
      this._alertService.showErrorMessage('Uups...', err.error.error.message);
    })
  }

  buildingForm(){
    this.fgv = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      repeatPassword: ['', Validators.required],
    },{validator: validarNotEqueal})
  }

  checkEqual(): boolean {
    return this.fgv.hasError('notEqual') &&
      this.password.dirty &&
      this.repeatPassword.dirty;
  }
 

  get oldPassword(){
    return this.fgv.get('oldPassword');
  }

  get password(){
    return this.fgv.get('password');
  }

  get repeatPassword(){
    return this.fgv.get('repeatPassword');
  }

}
