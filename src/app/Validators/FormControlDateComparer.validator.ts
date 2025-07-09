import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateFormatter } from './DateFormatter.formatter';

export function FormControlDateComparer(
  firstController: string,
  secondController: string,
  operator: string,
  message: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    // const firstDate = control?.get(firstController)?.value;
    // const secondDate = control?.get(secondController)?.value;
    const firstDate = control?.parent?.get(firstController)?.value;
    const secondDate = control?.parent?.get(secondController)?.value;
    // console.log(firstDate);
    // console.log(secondDate);
    let controlName : string | null = null
    if(parent) {
      Object.keys(parent?.controls).forEach(name => {
        if(control === parent.get(name)){
          controlName = name;
        }
      })
    }

    if (firstDate && secondDate ) {
      // console.log('hello');
      
      let inputFirstDate = DateFormatter(firstDate);
      let inputSecondDate = DateFormatter(secondDate);
      const diffInMs = inputFirstDate.getTime() - inputSecondDate.getTime();
      // console.log(diffInMs);
      
      switch (operator) {
        case 'gt':
          if (diffInMs <= 0) {
            return {
              FormControlDateComparerGt: message,
            };
          }
          break;
        case 'gte':
          if (diffInMs < 0) {
            return {
              FormControlDateComparerGte: message,
            };
          }
          break;
        case 'lt':
          if (diffInMs >= 0) {
            return {
              FormControlDateComparerLt: message,
            };
          }
          break;
        case 'lte':
         
          
          if (diffInMs > 0) {
          
            return {
              FormControlDateComparerLte: message,
            };
          }
          break;
        case 'eq':
          if (diffInMs != 0) {
            return {
              FormControlDateComparerEq: message,
            };
          }
          break;
        case 'neq':
          if (diffInMs == 0) {
            return {
              FormControlDateComparerNeq: message,
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
