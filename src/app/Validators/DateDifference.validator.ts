import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function DateDifference(
    checkDate : Date | string,
    diffVal : number, 
    type : string,
    operator : string,
    message : string
    ) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        
        const date = control.value;
        if(date) {
            let inputDate = date;
            let inputCheckDate = checkDate;

            if(typeof(date) == 'string') {
                const formatedDate =  date.split('-');
                inputDate =  new Date (
                    parseInt(formatedDate[2]),
                    parseInt(formatedDate[1]) - 1,
                    parseInt(formatedDate[0])
                )
            }

            if(typeof(checkDate) == 'string') {
                const formatedDate =  checkDate.split('-');
                inputCheckDate =  new Date (
                    parseInt(formatedDate[2]),
                    parseInt(formatedDate[1]) - 1,
                    parseInt(formatedDate[0])
                )
            }

            inputDate.setHours(0,0,0,0);
            (inputCheckDate as Date).setHours(0,0,0,0);
            

            const diffInMs = inputDate.getTime() - (inputCheckDate as Date).getTime();
            switch(type) {
                case('year') : 
                    const diffInYrs = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
                    switch(operator) {
                        case('gt') :
                            if(Math.abs(diffInYrs) <= diffVal) {
                                return ({
                                    DateDifferenceGt : message
                                })
                            }; break;
                        case('gte') :
                        
                            if(Math.abs(diffInYrs) < diffVal) {
                                return ({
                                    DateDifferenceGte : message
                                })
                            }; break;
                        case('lt') :
                        
                            if(Math.abs(diffInYrs) >= diffVal) {
                                return ({
                                    DateDifferenceLt : message
                                })
                            }; break;
                        case('lte') :
                      
                            if(Math.abs(diffInYrs) > diffVal) {
                                return ({
                                    DateDifferenceLte : message
                                })
                            }; break;
                         case 'eq':
                         
                            if (Math.abs(diffInYrs) != diffVal) {
                                return {
                                    DateDifferenceEq: message,
                                };
                            } break;
                        case 'neq':
                    
                            if (Math.abs(diffInYrs) == diffVal) {
                                return {
                                    DateDifferenceNeq: message,
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
                                    DateDifferenceGt : message
                                })
                            }; break;
                        
                        case('gte') :
                           
                            if(Math.abs(diffInMns) < diffVal) {
                                return ({
                                    DateDifferenceGte : message
                                })
                            }; break;
                      
                        case('lt') :
                        
                            if(Math.abs(diffInMns) >= diffVal) {
                                return ({
                                    DateDifferenceLt : message
                                })
                            }; break;
                        
                        case('lte') :
                      
                            if(Math.abs(diffInMns) > diffVal) {
                                return ({
                                    DateDifferenceLte : message
                                })
                            }; break;

                            case('eq') :
                      
                            if(Math.abs(diffInMns) != diffVal) {
                                return ({
                                    DateDifferenceLteEq : message
                                })
                            }; break;
                            case('neq') :
                      
                            if(Math.abs(diffInMns) == diffVal) {
                                return ({
                                    DateDifferenceLteNeq : message
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
                                    DateDifferenceGt : message
                                })
                            }; break;
                        case('gte') :
                            if(Math.abs(diffInDay) < diffVal) {
                                return ({
                                    DateDifferenceGte : message
                                })
                            }; break;
                     
                        case('lt') :
                            if(Math.abs(diffInDay) >= diffVal) {
                                return ({
                                    DateDifferenceLt : message
                                })
                            }; break;
                        case('lte') :
                            if(Math.abs(diffInDay) > diffVal) {
                                return ({
                                    DateDifferenceLte : message
                                })
                            }; break;
                        case('eq') :
                            if(Math.abs(diffInDay) != diffVal) {
                                return ({
                                    DateDifferenceEq : message
                                })
                            }; break;
                        case('neq') :
                            if(Math.abs(diffInDay) == diffVal) {
                                return ({
                                    DateDifferenceNeq : message
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