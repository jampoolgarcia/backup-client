import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/model/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { validarNotEqueal, validatorEquals } from 'src/app/shared/validator/app.validator';
import Swal from 'sweetalert2';
import { SecurityService } from '../../../../shared/services/security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [] 
})
export class RegisterComponent implements OnInit {

  public fgv: FormGroup;
  public role: number = 1;
  public isActive: boolean = false;


  constructor(
    private fb: FormBuilder,
    private _security: SecurityService,
    private _alertService: AlertService,
    private router: Router
    ) {
    
  }

  ngOnInit() {
   this.buildingForm();
  }

  buildingForm(){
    this.fgv = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(16)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(16)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      repeatPassword: ['', Validators.required],
      question1: ['', Validators.required],
      reply1: ['', Validators.required],
      question2: ['', Validators.required],
      reply2: ['', Validators.required],

    }, {validator: [validarNotEqueal, validatorEquals]});
  }


  checkEqual(): boolean {
    return this.fgv.hasError('notEqual') &&
      this.fgv.get('password').dirty &&
      this.fgv.get('repeatPassword').dirty;
  }

  checkNotEqual(): boolean {
    return this.fgv.hasError('equal') &&
      this.fgv.get('question1').dirty &&
      this.fgv.get('question2').dirty;
  }

  onSubmit(): void {

    let user = this.getData();
  
    this._security.saveRecord(user)
      .subscribe(user => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro',
          text: 'Se ha registrado exitosamente.',
          showConfirmButton: true,
          timer: 4000
        }).then(result => {
          this.fgv.reset(true)
          this.router.navigate(['/login'])
        });
      }, err => {
        this._alertService.showErr(err);
      })



  }

  getData(): UserI {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      userName: this.userName.value,
      password: this.password.value,
      role: this.role,
      isActive: this.isActive,
      questions: [parseInt(this.question1.value), parseInt(this.question2.value)],
      replies: [this.reply1.value, this.reply2.value]
    }
  }

  get firstName(){
    return this.fgv.get('firstName');
  }

  get lastName(){
    return this.fgv.get('lastName');
  }

  get userName(){
    return this.fgv.get('userName');
  }

  get password(){
    return this.fgv.get('password');
  }

  get repeatPassword(){
    return this.fgv.get('repeatPassword');
  }
  
  get question1(){
    return this.fgv.get('question1');
  }

  get question2(){
    return this.fgv.get('question2');
  }

  get reply1(){
    return this.fgv.get('reply1');
  }

  get reply2(){
    return this.fgv.get('reply2');
  }


}
