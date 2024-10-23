import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
  static patternValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const valid = regex.test(control.value);

    return valid ? null : {
      invalidPassword: {
        rules: 'Password must contain at least 8 characters, one letter, one number and one special character'
      }
    };
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : {
      passwordMismatch: true
    };
  }
}