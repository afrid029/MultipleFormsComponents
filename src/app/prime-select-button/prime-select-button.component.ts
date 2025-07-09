import { Component, forwardRef, Input } from '@angular/core';
import { CustomControlValueAccessorDirective } from '../directives/custom-control-value-accessor.directive';
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { PrimeErrorComponent } from '../prime-error/prime-error.component';

@Component({
  selector: 'app-prime-select-button',
  imports: [
    SelectButtonModule,
    ReactiveFormsModule,
    CommonModule,
    PrimeErrorComponent,
  ],
  templateUrl: './prime-select-button.component.html',
  styleUrl: './prime-select-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeSelectButtonComponent),
      multi: true,
    },
  ],
})
export class PrimeSelectButtonComponent<
  T
> extends CustomControlValueAccessorDirective<T> {
  @Input() label: string | undefined;
  @Input() showLabel: boolean = true;
  @Input() isDisabled: boolean = true;
  @Input() submitted: boolean = false;
  @Input() stateOptions: Record<string, string>[] = [];
  @Input() hasSmallText: boolean = false;
  @Input() smallText: string = '';
  // @Input() customErrorMessages: Record<string, string> = {};
  @Input() customErrors: string[] = [];
  @Input() uniqueId: string = '';
  @Input() showRequiredIcon: boolean = true;
  @Input() autoFocus: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() allowEmpty: boolean = false;
  crossErrorMessages: Record<string, string> = {};

  onChange(value: any): string {
    return value.value;
  }

  isCurrentControlRequiredOnDefault(): boolean {
    if (this.control) {
      if (this.control?.hasValidator(Validators.required)) {
        return true;
      }
    }

    return false;
  }

  isError(): boolean {
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
