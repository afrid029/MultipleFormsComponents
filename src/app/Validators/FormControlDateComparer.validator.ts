import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function FormControlDateComparer(firstController : string, secondController : string, operator : string, message : string) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        const firstDate = control?.get(firstController)?.value;
        const secondDate = control?.get(secondController)?.value;
        if(firstDate && secondDate){
            let inputFirstDate = firstDate;
            let inputSecondDate = secondDate;

            if(typeof(firstDate) == 'string') {
                const formatedDate = firstDate.split('-');
                inputFirstDate = new Date (
                    parseInt(formatedDate[2]),
                    parseInt(formatedDate[1]) - 1,
                    parseInt(formatedDate[0])
                );

            }
            if(typeof(secondDate) == 'string') {
                const formatedDate = secondDate.split('-');
                inputSecondDate = new Date (
                    parseInt(formatedDate[2]),
                    parseInt(formatedDate[1]) - 1,
                    parseInt(formatedDate[0])
                );

            }

            inputFirstDate.setHours(0,0,0,0);
            inputSecondDate.setHours(0,0,0,0);

            const diffInMs = inputFirstDate.getTime() - inputSecondDate.getTime();

            switch(operator) {
                case('gt') : 
                    if(diffInMs <= 0) {
                        return ({
                            // FormControlDateValidator : `${firstLabel} should be greater than ${secondLabel}`
                            FormControlDateComparerGt : message
                        })
                    } ; break;
                case('gte') : 
                    if(diffInMs < 0) {
                        return ({
                            FormControlDateComparerGte : message
                        })
                    } ; break;
                case('lt') : 
                    if(diffInMs >= 0) {
                        return ({
                            FormControlDateComparerLt : message
                        })
                    } ; break;
                case('lte') :
                     if(diffInMs > 0) {
                        return ({
                            FormControlDateComparerLte : message
                        })
                    } ; break;
                case('eq') : 
                    if(diffInMs != 0) {
                        return ({
                            FormControlDateComparerEq : message
                        })
                    }; break;
                case('neq') :
                    if(diffInMs == 0) {
                        return ({
                            FormControlDateComparerNeq : message
                        })
                    }; break
                default : 
                    return null;
            }
        }
        return null;
    }
}