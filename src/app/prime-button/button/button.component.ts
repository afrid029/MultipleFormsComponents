import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControlValueAccessorDirective } from '../../directives/custom-control-value-accessor.directive';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports:[ButtonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonComponent),
      multi: true,
    },
  ],
})
export class ButtonComponent<T> extends CustomControlValueAccessorDirective<T> {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() iconPos: 'left' | 'right' = 'left';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() styleClass?: string;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() severity: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' = 'success';
  @Input() size?: 'small' | 'large' | null = null;
  @Input() rounded: boolean = false;
  @Input() outlined: boolean = false;
  @Input() text: boolean = false;
  @Input() raised: boolean = false;
  @Input() fullWidth: boolean = false;

  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }

  get buttonClass(): string {
    let classes = '';

    if (this.size === 'small') classes += ' p-button-sm';
    if (this.size === 'large') classes += ' p-button-lg';
    if (this.severity) classes += ` p-button-${this.severity}`;
    if (this.rounded) classes += ' p-button-rounded';
    if (this.outlined) classes += ' p-button-outlined';
    if (this.text) classes += ' p-button-text';
    if (this.raised) classes += ' p-button-raised';
    if (this.fullWidth) classes += ' full-width';
    if (this.styleClass) classes += ` ${this.styleClass}`;

    return classes;
  }
}
