import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResetI } from 'src/app/shared/model/user-reset';
import { AlertService } from 'src/app/shared/services/alert.service';
import { validarNotEqueal, validatorEquals } from 'src/app/shared/validator/app.validator';

import { SecurityService } from '../../../../shared/services/security.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: []
})
export class ResetComponent implements OnInit {

  public fgv: FormGroup;
  public isUser: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private _securityService: SecurityService, 
    private _alertService: AlertService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buildingForm();
  }

  buildingForm(){
    this.fgv = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      repeatPassword: ['', Validators.required],
      question1: [{value: '', disabled: true}, Validators.required],
      reply1: ['', Validators.required],
      question2: [{value: '', disabled: true}, Validators.required],
      reply2: ['', Validators.required],
    }, {validator: [validarNotEqueal, validatorEquals]})
  }

  onSubmit(){
    let data = this.getData();

    this._securityService.resetPassword(data).subscribe(data =>{
      if(data){
        this._alertService.showConfirmationMessage('Registro', 'Su clave se a cambiado exitosamente.')
        .then(resp =>{
          this.fgv.reset();
          this.isUser = true;
          this.router.navigate(['/login'])
        })
      }
    }, err =>{
      this._alertService.showErr(err);
    })
  }

  getRecord(userName: string){

    this._securityService.getRecordByUserName(userName).subscribe(questions =>{
      this.question1.setValue(questions[0]);
      this.question2.setValue(questions[1]);
      this.isUser = false;
    }, err =>{
      this._alertService.showErr(err);
      this.fgv.reset();
      this.isUser = true;
    })
  }


  getData(): UserResetI {
    return {
      userName: this.userName.value,
      password: this.password.value,
      questions: [parseInt(this.question1.value), parseInt(this.question2.value)],
      replies: [this.reply1.value, this.reply2.value]
    }
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


  get userName(){
    return this.fgv.get('userName');
  }

  get password(){
    return this.fgv.get('password');
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
