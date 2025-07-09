import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PatternMatch(pattern: RegExp, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const input = control?.value;
    if (input) {
      const regExp: RegExp = pattern;
      if (!regExp.test(input)) {
        return {
          PatternMatch: message,
        };
      }
    }
    return null;
  };
}
