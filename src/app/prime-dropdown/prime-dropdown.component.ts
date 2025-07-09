import { Component, forwardRef, Input } from '@angular/core';
import { CustomControlValueAccessorDirective } from '../directives/custom-control-value-accessor.directive';

import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { PrimeErrorComponent } from '../prime-error/prime-error.component';
import { SelectModule } from 'primeng/select';
import { DataLoaderComponent } from '../data-loader/data-loader.component';

@Component({
  selector: 'app-prime-dropdown',
  templateUrl: './prime-dropdown.component.html',
  styleUrl: './prime-dropdown.component.scss',
  imports: [
    SelectModule,
    CommonModule,
    ReactiveFormsModule,
    PrimeErrorComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeDropdownComponent),
      multi: true,
    },
  ],
})
export class PrimeDropdownComponent<
  T
> extends CustomControlValueAccessorDirective<T> {
  @Input() label: string = '';
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() customErrors: string[] = [];

  @Input() isRecommendedValue: string = '';

  @Input() optionItems: any[] = [];
  @Input() optionValue: string = '';
  @Input() optionLabel: string = '';
  @Input() placeHolder: string = '';

  @Input() hasSmallText: boolean = false;
  @Input() smallText: string = '';

  @Input() showClear: boolean = false;
  @Input() dropdownIcon: string = 'pi pi-chevron-down';

  @Input() showLabel: boolean = true;

  @Input() submitted: boolean = false;

  crossErrorMessages: Record<string, string> = {};

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
}
