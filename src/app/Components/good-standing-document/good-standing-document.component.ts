import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import { PrimeDatepickerComponent } from '../../prime-datepicker/prime-datepicker/prime-datepicker.component';
import { ButtonComponent } from '../../prime-button/button/button.component';
import { GetDataService } from '../../Services/get-data.service';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';
import { ToastService } from '../../Services/toast.service';
import { LengthRestriction } from '../../Validators/LengthRestriction.validator';
import { PatternMatch } from '../../Validators/PatternMatch.validator';
import { DateComparer } from '../../Validators/DateComparer.validator';
import { FormControlDateComparer } from '../../Validators/FormControlDateComparer.validator';
import { DateFormatter } from '../../Validators/DateFormatter.formatter';

@Component({
  selector: 'app-good-standing-document',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    PrimeInputComponent,
    ReactiveFormsModule,
    PrimeFilterDropdownComponent,
    PrimeDatepickerComponent,
    ButtonComponent,
    DataLoaderComponent,
  ],
  templateUrl: './good-standing-document.component.html',
  styleUrl: './good-standing-document.component.scss',
})
export class GoodStandingDocumentComponent {
  dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);

  dob = signal<Date>(new Date(2012, 4, 24));
  today = signal<Date>(new Date());
  customErrors = signal<Record<string, string[]>>({});
  customValidators = signal<ValidatorFn[]>([]);
  employmentType = signal<Record<string, string>[]>([]);
  countries = signal<Record<string, string>[]>([]);
  stateOptions = signal<Record<string, string>[]>([]);
  minDate = signal<Date | undefined>(undefined);
  editData = signal<any>({});
  currentControl = signal<string>('');

  private _fb: FormBuilder = inject(FormBuilder);
  private _dataServ: GetDataService = inject(GetDataService);
  private _toastServ: ToastService = inject(ToastService);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);

  private instituteValidatiors = signal<ValidatorFn[]>([
    Validators.required,
    LengthRestriction(100, 'lte', 'Exceeded maximum character limit'),
  ])

  private certificationValidators = signal<ValidatorFn[]>([
    Validators.required,
          LengthRestriction(100, 'lte', 'Exceeded maximum character limit'),
  ]);

  private cityValidators= signal<ValidatorFn[]>([
     Validators.required,
    PatternMatch( /^[A-Za-z ]+$/, 'City only allow alphabets and spaces and no special characters'),
    LengthRestriction(4, 'gte', 'Invalid minimum character count'),
    LengthRestriction( 100,'lte','City should not exceed 100 characters'),
  ]);

  private expirydateValidators = signal<ValidatorFn[]>([
      DateComparer( this.dob(),    'gt',    'Expiry Date should be greater than date of birth'  ),
       FormControlDateComparer('expirydate','awardeddate','gte','Expiry date should be greater than awarded date'),
      FormControlDateComparer('expirydate','awardeddate','neq','Expiry date and awarded date should not be in the same date'),
  ])

  private awardeddateValidators = signal<ValidatorFn[]>([
      Validators.required,
      DateComparer(  this.dob(), 'gte', 'Awarded date cannot be less than date of birth'  ),  
      DateComparer(  this.today(),'lte', 'Awarded date cannot be greater than today' ),
      FormControlDateComparer('awardeddate','expirydate','lte','Awarded date should be less than expiry date'),
      FormControlDateComparer('awardeddate','expirydate','neq','Awarded date and expiry date should not be in the same date'),
  ])

  private docnumValidators = signal<ValidatorFn[]>([
    Validators.required,
    PatternMatch(/^[A-Za-z0-9]+$/,'Document number only allow alphabets and numbers'),
    LengthRestriction(4, 'gte', 'Invalid minimum character count'),
    LengthRestriction(50, 'lte', 'Exceeded maximum character limit'),
  ])

  ngOnInit(): void {
    this.employmentType.set(this._dataServ.getEmploymentType());
    this.countries.set(this._dataServ.getCountries());
    this.stateOptions.set(this._dataServ.getYesOrNo());

    this.minDate.set(
      new Date(
        this.today().getFullYear() - 10,
        this.today().getMonth(),
        this.today().getDate()
      )
    );

    this.dynamicForm = this._fb.group({
      institute: [ '', this.instituteValidatiors()],
      certification: [ '', this.certificationValidators()],
      country: ['', [Validators.required]],
      city: ['', this.cityValidators()],
      awardeddate: ['', this.awardeddateValidators()],
      expirydate: ['',this.expirydateValidators()],
      docnum: [ null, this.docnumValidators()],
    });

    this.loadCustomValidators();
  }

  loadCustomValidators() {
   if(this.dynamicForm) {
     this.dynamicForm?.valueChanges.subscribe((data) => {
      if(data.awardeddate && data.expirydate) {
        const awardeddate = DateFormatter(data.awardeddate);
        const expirydate = DateFormatter(data.expirydate);
         if(awardeddate < expirydate){
          this.dynamicForm?.controls['awardeddate'].updateValueAndValidity({emitEvent : false});
          this.dynamicForm?.controls['expirydate'].updateValueAndValidity({emitEvent : false});
        }
      }
    })
   }
  }

  filterCustomValidators(indexes: number[]): ValidatorFn[] {
    return this.customValidators().filter(
      (item, index) => !indexes.includes(index)
    );
  }

  ngAfterViewInit(): void {
    this.editData.set(this._config.data);
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

  setCurrent($event : string) {
    // console.log($event);
    this.currentControl.set($event);
    
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
      this._toastServ.showToastSuccess(
        'Success',
        'Document Submitted Successfuly !'
      );
    }
  }
}
