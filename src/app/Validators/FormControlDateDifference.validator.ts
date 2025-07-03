import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function FormControlDateDifference(
    firstController : string, 
    secondController : string,
    diffVal : number, 
    type : string,
    operator : string,
    message : string
    ) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        
       const firstDate = control?.get(firstController)?.value;
        const secondDate = control?.get(secondController)?.value;
        if(firstDate && secondDate) {
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
            
            switch(type) {
                case('year') : 
                    const diffInYrs = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
                    switch(operator) {
                        case('gt') :
                            if(Math.abs(diffInYrs) <= diffVal) {
                                return ({
                                    FormControlDateDifferenceGt : message
                                })
                            }; break;
                        case('gte') :
                        
                            if(Math.abs(diffInYrs) < diffVal) {
                                return ({
                                    FormControlDateDifferenceGte : message
                                })
                            }; break;
                        case('lt') :
                        
                            if(Math.abs(diffInYrs) >= diffVal) {
                                return ({
                                    FormControlDateDifferenceLt : message
                                })
                            }; break;
                        case('lte') :
                      
                            if(Math.abs(diffInYrs) > diffVal) {
                                return ({
                                    FormControlDateDifferenceLte : message
                                })
                            }; break;
                         case 'eq':
                         
                            if (Math.abs(diffInYrs) != diffVal) {
                                return {
                                    FormControlDateDifferenceEq: message,
                                };
                            } break;
                        case 'neq':
                    
                            if (Math.abs(diffInYrs) == diffVal) {
                                return {
                                    FormControlDateDifferenceNeq: message,
                                };
                            }break;
                        
                        default : return null;
                    }; break;
                
                 case('month') : 
                    const diffInMns = diffInMs / (1000 * 60 * 60 * 24 * 30);
                    switch(operator) {
                        case('gt') :
                         
                            if(Math.abs(diffInMns) <= diffVal) {
                                return ({
                                    FormControlDateDifferenceGt : message
                                })
                            }; break;
                        
                        case('gte') :
                           
                            if(Math.abs(diffInMns) < diffVal) {
                                return ({
                                    FormControlDateDifferenceGte : message
                                })
                            }; break;
                      
                        case('lt') :
                        
                            if(Math.abs(diffInMns) >= diffVal) {
                                return ({
                                    FormControlDateDifferenceLt : message
                                })
                            }; break;
                        
                        case('lte') :
                      
                            if(Math.abs(diffInMns) > diffVal) {
                                return ({
                                    FormControlDateDifferenceLte : message
                                })
                            }; break;
                        case('eq') :
                      
                            if(Math.abs(diffInMns) != diffVal) {
                                return ({
                                    FormControlDateDifferenceEq : message
                                })
                            }; break;
                        case('neq') :
                      
                            if(Math.abs(diffInMns) == diffVal) {
                                return ({
                                    FormControlDateDifferenceNeq : message
                                })
                            }; break;

                        default : return null;
                    }; break;
                
                case('day') : 
                    const diffInDay = diffInMs / (1000 * 60 * 60 * 24);
                    switch(operator) {
                        case('gt') :
                            if(Math.abs(diffInDay) <= diffVal) {
                                return ({
                                    FormControlDateDifferenceGt : message
                                })
                            }; break;
                        case('gte') :
                            if(Math.abs(diffInDay) < diffVal) {
                                return ({
                                    FormControlDateDifferenceGte : message
                                })
                            }; break;
                     
                        case('lt') :
                            if(Math.abs(diffInDay) >= diffVal) {
                                return ({
                                    FormControlDateDifferenceLt : message
                                })
                            }; break;
                        case('lte') :
                            if(Math.abs(diffInDay) > diffVal) {
                                return ({
                                    FormControlDateDifferenceLte : message
                                })
                            }; break;
                        case('eq') :
                            if(Math.abs(diffInDay) != diffVal) {
                                return ({
                                    FormControlDateDifferenceEq : message
                                })
                            }; break;
                        case('neq') :
                            if(Math.abs(diffInDay) == diffVal) {
                                return ({
                                    FormControlDateDifferenceNeq : message
                                })
                            }; break;
                       
                        default : return null;
                    }; break;
                
                default : return null;



            }
        }
        
        return null;
    }
}