import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
  DynamicDialogStyle,
} from 'primeng/dynamicdialog';
import { PrimeInputComponent } from '../../prime-input/prime-input.component';
import {
  FormBuilder,
  FormControl,
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
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { ToastService } from '../../Services/toast.service';
import { DateComparer } from '../../Validators/DateComparer.validator';
import { FormControlDateComparer } from '../../Validators/FormControlDateComparer.validator';
import { FormControlDateDifference } from '../../Validators/FormControlDateDifference.validator';
import { LengthRestriction } from '../../Validators/LengthRestriction.validator';

@Component({
  selector: 'app-employment-document',
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
  ],
  templateUrl: './employment-document.component.html',
  styleUrl: './employment-document.component.scss'
})
export class EmploymentDocumentComponent implements OnInit, AfterViewInit, OnDestroy {
 dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);
  customErrors: Record<string, string[]> = {};
  customValidators: ValidatorFn[] = [];
  today: Date = new Date();
  dob: Date = new Date(2012, 4, 24);

  employmentType = signal<Record<string, string>[]>([]);
  countries = signal<Record<string, string>[]>([]);
  stateOptions = signal<Record<string, string>[]>([]);
  slideOptions = signal<Record<string, string>[]>([]);
  minDate = signal<Date | undefined>(undefined);

  editData: any = {};

  private _fb: FormBuilder = inject(FormBuilder);
  private _dataServ: GetDataService = inject(GetDataService);
  private _toastServ: ToastService = inject(ToastService);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);

  ngOnInit(): void {
    this.employmentType.set(this._dataServ.getEmploymentType());
    this.countries.set(this._dataServ.getCountries());
    this.stateOptions.set(this._dataServ.getYesOrNo());
    this.slideOptions.set(this._dataServ.getSlider());
    this.minDate.set(
      new Date(this.today.getFullYear() - 10,this.today.getMonth(),this.today.getDate()
      )
    );

    this.dynamicForm = this._fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      country: ['', [Validators.required]],
      employmenttype: ['', [Validators.required]],
      startdate: ['',
        [
          Validators.required,
          DateComparer(this.today,'lte','Job start date cannot be greater than today'  ),
          // GreaterThanDateValidator(this.dob),
          DateComparer(this.dob,'gt','Job start date should be greater than date of birth'  ),
        ],
      ],
      // startdate : new FormControl('', [Validators.required,NotGreaterThanToday, StartDateWithEndDate,MinimumEmploymentPeriod, GreaterThanDateValidator(dob)]),
      enddate: [
        '',[
          Validators.required,
          // NotGreaterThanToday,
          DateComparer(this.today,'lte','Job end date cannot be greater than today'  ),
          // GreaterThanDateValidator(this.dob),
          DateComparer(this.dob,'gt','Job end date should be greater than date of birth'  ),
        ],
      ],
      supervisor: [''],
      email: ['', [Validators.email]],
      phone: [
        null,
        [
          LengthRestriction(7,'gte','Phone number length should not be less than 7 digits.'),
          LengthRestriction(15,'lte','Phone number length should not be greater than 15 digits.'),
        ],
      ],
      iscurrent: ['no', [Validators.required]],
      contactcurrent: ['no', []],
    });

    this.customValidators = [
      FormControlDateComparer('startdate','enddate','lte','Job start date cannot be greater than end date.'),
      FormControlDateComparer('enddate','startdate','gte','Job end date cannot be less than start date.'),
      FormControlDateComparer('enddate','startdate','neq','Job end date cannot be the same as start date.'),
      FormControlDateDifference('enddate','startdate',1,'month','gte','Job start date and end date should have atleast one month gap'
      ),
    ];

    this.dynamicForm.setValidators(this.customValidators);

    this.loadCustomValidators();
  }

  loadCustomValidators() {
    this.customErrors['startdate'] = [
      'FormControlDateComparerLte',
      'FormControlDateDifferenceGte'
    ];
    this.customErrors['enddate'] = [
      'FormControlDateComparerGte',
      'FormControlDateComparerNeq',
      'FormControlDateDifferenceGte',
    ];

    if (this.dynamicForm) {
      this.dynamicForm?.get('iscurrent')?.valueChanges.subscribe((data) => {
        const endDate = this.dynamicForm?.get('enddate');
        if (data == 'yes') {
          endDate?.setValue(new Date());
          endDate?.disable();
          this.dynamicForm?.get('contactcurrent')?.addValidators(Validators.required);
          this.dynamicForm?.setValidators([]);
        } else {
          endDate?.enable();
          this.dynamicForm?.get('contactcurrent')?.removeValidators(Validators.required);

          this.dynamicForm?.setValidators(this.customValidators);
        }

        this.dynamicForm?.get('contactcurrent')?.updateValueAndValidity();
      });
    }
  }

  filterCustomValidators(indexes: number[]): ValidatorFn[] {
    return this.customValidators.filter(
      (item, index) => !indexes.includes(index)
    );
  }

  ngAfterViewInit(): void {
    // console.log(this.editData);
    this.editData = this._config.data;
    if (this.editData && this.editData.Id) {
      this.dataLoaded.set(false);

      setTimeout(() => {
        this.dynamicForm?.patchValue(this.editData);
        // this.dynamicForm?.get('dob')?.updateValueAndValidity();
        this.loadCustomValidators();
        this.dynamicForm?.markAllAsTouched();
        this.dynamicForm?.updateValueAndValidity();
        this.dataLoaded.set(true);
      }, 3000);
    }
  }
  ngOnDestroy(): void {
    this.editData = {};
  }

  onSubmit() {
    this.loading.set(true);
    this.dynamicForm?.markAllAsTouched();
    // console.log(this.dynamicForm?.value);

    if (this.dynamicForm?.invalid) {
      this._toastServ.showToastError('Invalid','There are validation issues in your submission. Please review the form and try again.'
      );

      this.loading.set(false);
    } else {
      this._ref.close(this.dynamicForm?.value);
       this._toastServ.showToastSuccess('Success', 'Document Submitted Successfuly !')
    }
  }
}
