import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CustomControlValueAccessorDirective } from '../../directives/custom-control-value-accessor.directive';
import {
  FormControlName,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeErrorComponent } from '../../prime-error/prime-error.component';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-prime-datepicker',
  templateUrl: './prime-datepicker.component.html',
  styleUrl: './prime-datepicker.component.scss',
  imports: [
    CommonModule,
    PrimeErrorComponent,
    ReactiveFormsModule,
    DatePickerModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeDatepickerComponent),
      multi: true,
    },
  ],
})
export class PrimeDatepickerComponent<
  T
> extends CustomControlValueAccessorDirective<T> {
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() isDisabled: boolean = true;
  @Input() submitted: boolean = false;
  @Input() hasSmallText: boolean = false;
  @Input() smallText: string = '';
  @Input() customErrors: string[] = [];
  crossErrorMessages: Record<string, string> = {};
  // @Input() customErrorMessages: Record<string, string> = {};
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() formControlName : string = '';


  @Input() dateFormat: string = 'dd-mm-yy';
  @Input() showIcon: boolean = true;

  @Input() isEditable: boolean = false;

  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;

  @Input() showButtonBar: boolean = false;
  @Input() disabledDates: any[] = [];

  // @Input() currentCtr : string = '';
  @Output() currentController : EventEmitter<string> = new EventEmitter<string>();

  Focusing() {
    this.currentController.emit(this.formControlName)
  }



  isError(): boolean {
     if (!this.control) return false;
    const keys = Object.keys(this.control?.parent?.errors ?? {});
    this.crossErrorMessages = {};
    this.customErrors?.forEach((cust) => {
      const x = keys.includes(cust);
      if (x) {
        this.crossErrorMessages[cust] = this.control?.parent?.errors?.[cust];
      }
    });


    return (
      Object.keys(this.crossErrorMessages).length > 0 ||
      (this.control.invalid && 
        (this.control.dirty || this.control.touched || this.submitted))
    );
  }

  isCurrentControlRequiredOnDefault(): boolean {
    if (this.control) {
      if (this.control?.hasValidator(Validators.required)) {
        return true;
      }
    }

    return false;
  }
}
