import { AbstractControl, ValidationErrors } from "@angular/forms";

export function AcceptValidator(control: AbstractControl): ValidationErrors | null {
  const state = control.value;
  if (state == 'no') {
    return {
      AcceptValidator: null
    };
  }

  return null;
}