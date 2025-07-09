import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateFormatter } from './DateFormatter.formatter';

export function DateComparer(
  checkDate: Date | string,
  operator: string,
  message: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    if (date) {
      let inputDate = DateFormatter(date);
      let inputCheckDate = DateFormatter(checkDate);

      const diffInMs = inputDate.getTime() - (inputCheckDate as Date).getTime();
      switch (operator) {
        case 'gt':
          if (diffInMs <= 0) {
            return {
              DateComparerGt: message,
            };
          }
          break;
        case 'gte':
          if (diffInMs < 0) {
            return {
              DateComparerGte: message,
            };
          }
          break;
        case 'lt':
          if (diffInMs >= 0) {
            return {
              DateComparerLt: message,
            };
          }
          break;
        case 'lte':
          if (diffInMs > 0) {
            return {
              DateComparerLte: message,
            };
          }
          break;
        case 'eq':
          if (diffInMs != 0) {
            return {
              DateComparerEq: message,
            };
          }
          break;
        case 'neq':
          if (diffInMs == 0) {
            return {
              DateComparerNeq: message,
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
