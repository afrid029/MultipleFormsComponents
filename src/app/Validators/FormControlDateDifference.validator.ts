import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateFormatter } from './DateFormatter.formatter';

export function FormControlDateDifference(
  firstController: string,
  secondController: string,
  diffVal: number,
  type: string,
  operator: string,
  message: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstDate = control?.parent?.get(firstController)?.value;
    const secondDate = control?.parent?.get(secondController)?.value;
    if (firstDate && secondDate) {
      let inputFirstDate = DateFormatter(firstDate);
      let inputSecondDate = DateFormatter(secondDate);
      const diffInMs = inputFirstDate.getTime() - inputSecondDate.getTime();
      switch (type) {
        case 'year':
          const diffInYrs = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
          switch (operator) {
            case 'gt':
              if (Math.abs(diffInYrs) <= diffVal) {
                return {
                  FormControlDateDifferenceGt: message,
                };
              }
              break;
            case 'gte':
              if (Math.abs(diffInYrs) < diffVal) {
                return {
                  FormControlDateDifferenceGte: message,
                };
              }
              break;
            case 'lt':
              if (Math.abs(diffInYrs) >= diffVal) {
                return {
                  FormControlDateDifferenceLt: message,
                };
              }
              break;
            case 'lte':
              if (Math.abs(diffInYrs) > diffVal) {
                return {
                  FormControlDateDifferenceLte: message,
                };
              }
              break;
            case 'eq':
              if (Math.abs(diffInYrs) != diffVal) {
                return {
                  FormControlDateDifferenceEq: message,
                };
              }
              break;
            case 'neq':
              if (Math.abs(diffInYrs) == diffVal) {
                return {
                  FormControlDateDifferenceNeq: message,
                };
              }
              break;

            default:
              return null;
          }
          break;

        case 'month':
          const diffInMns = diffInMs / (1000 * 60 * 60 * 24 * 30);
          switch (operator) {
            case 'gt':
              if (Math.abs(diffInMns) <= diffVal) {
                return {
                  FormControlDateDifferenceGt: message,
                };
              }
              break;

            case 'gte':
              if (Math.abs(diffInMns) < diffVal) {
                return {
                  FormControlDateDifferenceGte: message,
                };
              }
              break;

            case 'lt':
              if (Math.abs(diffInMns) >= diffVal) {
                return {
                  FormControlDateDifferenceLt: message,
                };
              }
              break;

            case 'lte':
              if (Math.abs(diffInMns) > diffVal) {
                return {
                  FormControlDateDifferenceLte: message,
                };
              }
              break;
            case 'eq':
              if (Math.abs(diffInMns) != diffVal) {
                return {
                  FormControlDateDifferenceEq: message,
                };
              }
              break;
            case 'neq':
              if (Math.abs(diffInMns) == diffVal) {
                return {
                  FormControlDateDifferenceNeq: message,
                };
              }
              break;

            default:
              return null;
          }
          break;

        case 'day':
          const diffInDay = diffInMs / (1000 * 60 * 60 * 24);
          switch (operator) {
            case 'gt':
              if (Math.abs(diffInDay) <= diffVal) {
                return {
                  FormControlDateDifferenceGt: message,
                };
              }
              break;
            case 'gte':
              if (Math.abs(diffInDay) < diffVal) {
                return {
                  FormControlDateDifferenceGte: message,
                };
              }
              break;

            case 'lt':
              if (Math.abs(diffInDay) >= diffVal) {
                return {
                  FormControlDateDifferenceLt: message,
                };
              }
              break;
            case 'lte':
              if (Math.abs(diffInDay) > diffVal) {
                return {
                  FormControlDateDifferenceLte: message,
                };
              }
              break;
            case 'eq':
              if (Math.abs(diffInDay) != diffVal) {
                return {
                  FormControlDateDifferenceEq: message,
                };
              }
              break;
            case 'neq':
              if (Math.abs(diffInDay) == diffVal) {
                return {
                  FormControlDateDifferenceNeq: message,
                };
              }
              break;

            default:
              return null;
          }
          break;

        default:
          return null;
      }
    }

    return null;
  };
}
