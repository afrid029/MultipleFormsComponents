import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function LengthRestriction(
  limit: number,
  operator: string,
  message: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const input = control.value;
    if (input) {
      let StringValue = input;
      if (typeof input == 'number') {
        StringValue = input.toString();
      }

      const length = StringValue.length;
      switch (operator) {
        case 'gt':
          if (length <= limit) {
            return {
              LengthRestrictionGt: message,
            };
          }
          break;
        case 'gte':
          if (length < limit) {
            return {
              LengthRestrictionGte: message,
            };
          }
          break;
        case 'lt':
          if (length >= limit) {
            return {
              LengthRestrictionLt: message,
            };
          }
          break;
        case 'lte':
          if (length > limit) {
            return {
              LengthRestrictionLte: message,
            };
          }
          break;
        case 'eq':
          if (length != limit) {
            return {
              LengthRestrictionEq: message,
            };
          }
          break;
        case 'neq':
          if (length == limit) {
            return {
              LengthRestrictionNeq: message,
            };
          }
          break;
        default:
          return null;
      }
    }
    return null;
  };
}
