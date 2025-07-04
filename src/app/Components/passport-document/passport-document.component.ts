import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimeInputComponent } from '../../prime-input/prime-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PrimeFilterDropdownComponent } from '../../prime-filter-dropdown/prime-filter-dropdown/prime-filter-dropdown.component';
import { PrimeDropdownComponent } from '../../prime-dropdown/prime-dropdown.component';
import { PrimeDatepickerComponent } from '../../prime-datepicker/prime-datepicker/prime-datepicker.component';
import { PrimeSelectButtonComponent } from '../../prime-select-button/prime-select-button.component';
import { PrimeInputNumberComponent } from '../../prime-input-number/prime-input-number.component';
import { ButtonComponent } from '../../prime-button/button/button.component';
import { GetDataService } from '../../Services/get-data.service';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../Services/toast.service';
import { FormControlDateComparer } from '../../Validators/FormControlDateComparer.validator';
import { DateDifference } from '../../Validators/DateDifference.validator';
import { LengthRestriction } from '../../Validators/LengthRestriction.validator';

@Component({
  selector: 'app-passport-document',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    PrimeInputComponent,
    ReactiveFormsModule,
    PrimeFilterDropdownComponent,
    PrimeDropdownComponent,
    PrimeDatepickerComponent,
    PrimeSelectButtonComponent,
    PrimeInputNumberComponent,
    ButtonComponent,
    DataLoaderComponent,
    ToastModule,
  ],

  templateUrl: './passport-document.component.html',
  styleUrl: './passport-document.component.scss'
})
export class PassportDocumentComponent implements OnInit, AfterViewInit, OnDestroy {
dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);
  customErrors = signal<Record<string, string[]>>({});
  customValidators =signal<ValidatorFn[]>([]);
  today = signal<Date>(new Date());
  gender = signal<Record<string, string>[]>([]);
  countries = signal<Record<string, string>[]>([])
  slideOptions = signal<Record<string, string>[]>([]);
  minDate = signal<Date | undefined>(undefined);
  editData = signal<any>({});

  private _fb : FormBuilder = inject(FormBuilder);
  private _dataServ : GetDataService = inject(GetDataService);
  private _toastServ : ToastService = inject(ToastService);
  private _config : DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref : DynamicDialogRef = inject(DynamicDialogRef);

  ngOnInit(): void {
  this.gender.set(this._dataServ.getGender());
  this.countries.set(this._dataServ.getCountries());
  this.slideOptions.set(this._dataServ.getSlider());
  
    this.minDate.set(
      new Date(this.today().getFullYear() - 10, this.today().getMonth(), this.today().getDate())
    );

    this.dynamicForm = this._fb.group(
      {
        name: ['',[Validators.required]],
        lastname: ['', [Validators.required]],
        middlename: [''],
        gender: ['', [Validators.required]],
        dob: ['', [
          Validators.required,
          DateDifference(this.today(),10,'year','gte','Candidate should be atleast 10 years old'),
          DateDifference(this.today(),100,'year','lte','Candidate age should not be greater than 100'),
        ]],
        passport: [null, [
          Validators.required,
          LengthRestriction(2, 'gte', 'Passport number should have atleast two digits')
        ]],
        nationality: ['', [Validators.required]],
        expiry: ['', [Validators.required]],
        agree: ['no', [Validators.required]]
      });

    this.customValidators.set([
      FormControlDateComparer('expiry', 'dob', 'gte','Passport expiry date should not be less than Date Of birth'),
    ]);

    this.dynamicForm.setValidators(this.customValidators());
    this.loadCustomValidators();
  }

  loadCustomValidators() {
    this.customErrors()['expiry'] = ['FormControlDateComparerGte'];
  }

   filterCustomValidators(indexes: number[]): ValidatorFn[] {
    return this.customValidators().filter(
      (item, index) => !indexes.includes(index)
    );
  }

  ngAfterViewInit(): void {
    this.editData.set(this._config?.data)
    if (this.editData() && this.editData().Id) {
      this.dataLoaded.set(false);

      setTimeout(() => {
        this.dynamicForm?.patchValue(this.editData());
        this.loadCustomValidators();
        this.dynamicForm?.markAllAsTouched();
        this.dynamicForm?.updateValueAndValidity();
        this.dataLoaded.set(true);
      }, 3000);
    }
  }
  ngOnDestroy(): void {
    this.editData.set({});
  }
  onSubmit() {
    this.loading.set(true);
    this.dynamicForm?.markAllAsTouched();
    if (this.dynamicForm?.invalid) {
      this._toastServ.showToastError(
        'Invalid',
        'There are validation issues in your submission. Please review the form and try again.'
      );
      this.loading.set(false);
    } else {
      this._ref.close(this.dynamicForm?.value);
      this._toastServ.showToastSuccess('Success', 'Document Submitted Successfuly !')
    }
  }
}
