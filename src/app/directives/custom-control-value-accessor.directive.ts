
import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators,
} from '@angular/forms';
import {
  Subject,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  selector: '[appCustomControlValueAccessor]',
})
export class CustomControlValueAccessorDirective<T> implements ControlValueAccessor, OnInit {
  control: FormControl | undefined;
  isRequired = false;

  private _isDisabled = false;
  private _destry$ = new Subject<void>();
  private _onTouched!: () => T;
  private _onChange!: () => T;

  constructor(@Inject(Injector) private injector: Injector, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
    } catch (error) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    if (this.control) {
      if (this.control.value !== value) {
        this.control.setValue(value);
      }
    } else {
      this.control = new FormControl(value);
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this._destry$),
        distinctUntilChanged(),
        tap((val) => fn(val))
      )
      .subscribe(() => this.control?.markAsUntouched());
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
}
