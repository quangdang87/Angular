// import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// @Directive({
//   selector: '[appEmailValidator]'
// })
// export class EmailValidatorDirective {

//   constructor() {  }

export function emailValidator(email: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = email.test(control.value);
    return !valid ? { errors: 'Invalid email format' } : null;
  };
}

// }
