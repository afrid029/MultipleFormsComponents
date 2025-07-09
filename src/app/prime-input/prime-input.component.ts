import { Component, forwardRef, inject, Input } from '@angular/core';
// import { Direction, InputType, KeyFilter } from '../../models/componentTypes';
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { CustomControlValueAccessorDirective } from '../directives/custom-control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { PrimeErrorComponent } from '../prime-error/prime-error.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-prime-input',
  templateUrl: './prime-input.component.html',
  styleUrl: './prime-input.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeErrorComponent,
    InputTextModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputComponent),
      multi: true,
    },
  ],
})
export class PrimeInputComponent<
  T
> extends CustomControlValueAccessorDirective<T> {
  @Input() label: string | undefined;
  @Input() type: string = 'text';
  @Input() placeholder: string | undefined;
  @Input() isDisabled: boolean = true;
  @Input() submitted: boolean = false;
  @Input() hasSmallText: boolean = false;
  @Input() smallText: string = '';

  // @Input() customErrorMessages: Record<string, string> = {};
  @Input() customErrors: string[] = [];
  @Input() uniqueId: string = '';
  @Input() showRequiredIcon: boolean = true;
  @Input() autoFocus: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  crossErrorMessages: Record<string, string> = {};

  isCurrentControlRequiredOnDefault(): boolean {
    if (this.control) {
      if (this.control?.hasValidator(Validators.required)) {
        return true;
      }
    }

    return false;
  }

  isError(): boolean {
    // console.log(this.control?.errors?.[0]);

    const keys = Object.keys(this.control?.parent?.errors ?? {});
    this.crossErrorMessages = {};
    this.customErrors?.forEach((cust) => {
      const x = keys.includes(cust);
      if (x) {
        this.crossErrorMessages[cust] = this.control?.parent?.errors?.[cust];
      }
    });

    if (!this.control) return false;

    return (
      Object.keys(this.crossErrorMessages).length > 0 ||
      (this.control.invalid &&
        (this.control.dirty || this.control.touched || this.submitted))
    );
  }
}
