import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-prime-error',
  templateUrl: './prime-error.component.html',
  styleUrls: ['./prime-error.component.scss'],
  imports: [CommonModule],
})
export class PrimeErrorComponent implements OnInit, OnChanges {
  @Input() errors: Record<string, ValidationErrors> | null = {};
  @Input() crossErrorMessages: Record<string, string> | any = {};
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  errorMessages = signal<Record<string, string>>({});
  customErrorMessages = signal<Record<string, string> | any>({});
  controllerError = signal<string | any>('');
  crossError : string = '';

  ngOnInit(): void {
    this.setErrorMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['customErrorMessages'] &&
        changes['customErrorMessages'].currentValue) ||
      (changes['errors'] && changes['errors'].currentValue)
    ) {
      this.setErrorMessages();
    }
  }

 
  hasCrossErrors(): boolean {
    if (Object.keys(this.crossErrorMessages).length > 0) {
      this.crossError = Object.values(this.crossErrorMessages)[0] as string;
      return true;
    }

    return false;
  }

  setErrorMessages(): void {
    const baseErrorMessages: Record<string, string> = {
      required: 'This field is required.',
      email: 'Invalid email address.',
      pattern: 'Invalid format.',
      maxlength: 'Exceeded maximum length.',
      minlength: 'Below minimum length.',
      emptyString: 'This field cannot be empty.',
      passwordDoesNotMatch: 'Passwords do not match.',
    };

    if (this.errors) {
      const firstError = Object.keys(this.errors)[0];
      if (Object.keys(baseErrorMessages).includes(firstError)) {
        this.controllerError.set(baseErrorMessages[firstError]);
      } else {
        this.controllerError.set(this.errors?.[firstError]);
      }
    }
  }
}
