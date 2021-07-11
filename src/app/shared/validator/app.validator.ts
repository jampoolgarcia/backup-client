import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarNotEqueal: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('repeatPassword');

  return password.value === confirmarPassword.value ? null : { 'notEqual': true };
};

export const validatorEquals: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const question1 = control.get('question1');
  const question2 = control.get('question2');

  return question1.value === question2.value ? { 'equal': true } : null;
};