import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateFormatter } from './DateFormatter.formatter';

export function StartDateValidator(dob: string | Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control?.parent?.get('startdate');
    const endDate = control?.parent?.get('enddate');

    if (startDate) {
      const startDateValue = DateFormatter(startDate.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // startDateValue.setHours(0,0,0,0);

      let diffInMs = today.getTime() - startDateValue.getTime();
      if (diffInMs < 0) {
        return {
          StartDateCantBeGreaterThanToday:
            'Start date cannot be greater than today.',
        };
      }

      const inputDob = DateFormatter(dob);
      diffInMs = startDateValue.getTime() - inputDob.getTime();
      // console.log(diffInMs);

      if (diffInMs < 0) {
        return {
          StartDateGreaterThanDob:
            'Start Date should be greater than date of birth.',
        };
      }
    }

    if (startDate && endDate) {
      const startDateValue = DateFormatter(startDate.value);
      const endDateValue = DateFormatter(endDate.value);
      // endDateValue.setHours(0,0,0,0);
      // startDateValue.setHours(0,0,0,0);

      let diffInMs = endDateValue.getTime() - startDateValue.getTime();

      if (diffInMs == 0) {
        return {
          StartDateNotEqualToEndDate: 'Start date cannot be equal to end date.',
        };
      }

      if (diffInMs < 0) {
        return {
          StartNotGreaterThanEndDate:
            'Start date cannot be greater than end date.',
        };
      }
    }

    return null;
  };
}

export function EndDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control?.parent?.get('startdate');
    const endDate = control?.parent?.get('enddate');
    const awardedDate = control?.parent?.get('awardeddate');

    if (endDate) {
      const EndDateValue = DateFormatter(endDate.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // EndDateValue.setHours(0,0,0,0);

      let diffInMs = today.getTime() - EndDateValue.getTime();
      if (diffInMs < 0) {
        return {
          EndDateStartDate: 'End date cannot be greater than today.',
        };
      }
    }

    return null;
  };
}

export function AwardedDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const awardedDate = control?.parent?.get('awardeddate');
    const endDate = control?.parent?.get('enddate');
    if (awardedDate) {
      const AwardedDateValue = DateFormatter(awardedDate.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // AwardedDateValue.setHours(0,0,0,0);

      let diffInMs = today.getTime() - AwardedDateValue.getTime();
      if (diffInMs < 0) {
        return {
          AwardedDateLessThanEndDate:
            'Date of awarded cannot be greater than today.',
        };
      }
    }

    if (endDate && awardedDate) {
      const awardedDatevalue = DateFormatter(awardedDate.value);
      const endDateValue = DateFormatter(endDate.value);

      const diffInMs = awardedDatevalue.getTime() - endDateValue.getTime();
      if (diffInMs < 0) {
        return {
          DateofAwardedNotLessThanEndDate:
            'Date of awarded cannot be less than end date',
        };
      }
    }
    return null;
  };
}

export function StartDateEndDateAwardDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control?.parent?.get('startdate');
    const endDate = control?.parent?.get('enddate');
    const awardedDate = control?.parent?.get('awardeddate');
   
      if (startDate && endDate) {
        const startDateValue = DateFormatter(startDate.value);
        const endDateValue = DateFormatter(endDate.value);
        // endDateValue.setHours(0,0,0,0);
        // startDateValue.setHours(0,0,0,0);
        let diffInMs = endDateValue.getTime() - startDateValue.getTime();
        if (diffInMs < 0) {
          return {
            EndDateCantBeLessThanStartDate:
              'End date cannot be less than start date.',
          };
        }

        const diffInDay = diffInMs / (1000 * 60 * 60 * 24);
        if (diffInDay < 1) {
          return {
            EndDateStartDateGap:
              'The gap between end date and start Date should be minimum 1 day.',
          };
        }
      }

      if (endDate && awardedDate) {
        const endDateValue = DateFormatter(endDate.value);
        const awardedDateValue = DateFormatter(awardedDate.value);
        const diffInMs = endDateValue.getTime() - awardedDateValue.getTime();
        console.log(endDateValue.getTime() - awardedDateValue.getTime());

        if (diffInMs > 0) {
          return {
            EndDateNotGreaterThanAwardedDate:
              'End date cannot be greater than date of awarded',
          };
        }
      }
    

    // if (secondController == 'awardeddate') {
    //   if (endDate && awardedDate) {
    //     const endDateValue = DateFormatter(endDate.value);
    //     const awardedDateValue = DateFormatter(awardedDate.value);
    //     const diffInMs = endDateValue.getTime() - awardedDateValue.getTime();
    //     console.log(endDateValue.getTime() - awardedDateValue.getTime());

    //     if (diffInMs > 0) {
    //       return {
    //         EndDateNotGreaterThanAwardedDate:
    //           'End date cannot be greater than date of awarded',
    //       };
    //     }
    //   }
    // }

    // if (secondController == 'startdate') {
    //   if (startDate && endDate) {
    //     const startDateValue = DateFormatter(startDate.value);
    //     const endDateValue = DateFormatter(endDate.value);
    //     let diffInMs = endDateValue.getTime() - startDateValue.getTime();
    //     if (diffInMs < 0) {
    //       return {
    //         EndDateCantBeLessThanStartDate:
    //           'End date cannot be less than start date.',
    //       };
    //     }

    //     const diffInDay = diffInMs / (1000 * 60 * 60 * 24);
    //     if (diffInDay >= 1) {
    //       return {
    //         EndDateStartDateGap:
    //           'The gap between end date and start Date should be minimum 1 day.',
    //       };
    //     }
    //   }
    // }
    return null;
  };
}


