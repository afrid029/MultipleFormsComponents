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
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
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
import { ButtonComponent } from '../../prime-button/button/button.component';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';
import { ToastService } from '../../Services/toast.service';
import { DateComparer } from '../../Validators/DateComparer.validator';
import { FormControlDateComparer } from '../../Validators/FormControlDateComparer.validator';
import { FormControlDateDifference } from '../../Validators/FormControlDateDifference.validator';
import { GetDataService } from '../../Services/get-data.service';
@Component({
  selector: 'app-degree-document',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    PrimeInputComponent,
    ReactiveFormsModule,
    PrimeFilterDropdownComponent,
    PrimeDropdownComponent,
    PrimeDatepickerComponent,
    ButtonComponent,
    DataLoaderComponent,
  ],
  templateUrl: './degree-document.component.html',
  styleUrl: './degree-document.component.scss'
})
export class DegreeDocumentComponent implements OnInit, AfterViewInit, OnDestroy {
dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);
  customErrors= signal<Record<string, string[]>>({});
  customValidators  = signal <ValidatorFn[]>([]);
  today = signal <Date>(new Date());
  degreeType = signal<Record<string, string>[]>([]);
  studyMode = signal<Record<string, string>[]>([]);
  countries = signal<Record<string, string>[]>([])
  completionOptions = signal<Record<string, string>[]>([]);
  minDate = signal<Date | undefined>(undefined);
  editData = signal<any>({});

  private _fb: FormBuilder = inject(FormBuilder);
  private _toastServ: ToastService = inject(ToastService);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _dataServ : GetDataService = inject(GetDataService)

  ngOnInit(): void {
    this.countries.set(this._dataServ.getCountries());
    this.studyMode.set(this._dataServ.getStudyMode());
    this.degreeType.set(this._dataServ.getDegreeType());
    this.completionOptions.set(this._dataServ.getYesOrNo());
    
    this.minDate.set(
      new Date(
        this.today().getFullYear() - 10,
        this.today().getMonth(),
        this.today().getDate()
      )
    );

    const dob = new Date(2012, 4, 24);
    this.dynamicForm = this._fb.group(
      {
        name: ['', [Validators.required]],
        title: ['', [Validators.required]],
        country: ['', [Validators.required]],
        institution: ['', [Validators.required]],
        degreetype: ['', [Validators.required]],
        studymode: ['', [Validators.required]],
        completion: ['yes', [Validators.required]],
        startdate: ['',
          [
            Validators.required,
            DateComparer(  this.today(),  'lte',  'Start date cannot be greater than today.'),
            DateComparer(  dob,  'gt',  'Start Date should be greater than date of birth.')
          ],
        ],
        enddate: [ '',
          [
            Validators.required,
            DateComparer(  this.today(),  'lte',  'End date cannot be greater than today.'),
          ],
        ],
        awardeddate: ['',
          [
            Validators.required,
            DateComparer(  this.today(),  'lte',  'Date of awarded cannot be greater than today.'),
          ],
        ],
      });
    this.customValidators.set([
      FormControlDateComparer('startdate','enddate','neq','Start date cannot be equal to end date.' ),
      FormControlDateComparer('startdate','enddate','lt','Start date cannot be greater than end date.' ),
      FormControlDateComparer('enddate','startdate','gt','End date cannot be less than start date.'),
      FormControlDateDifference('enddate','startdate',1,'day','gte','The gap between end date and start Date should be minimum 1 day.'),
      FormControlDateComparer('enddate','awardeddate','lte','End date cannot be greater than date of awarded'),
      FormControlDateComparer('awardeddate','enddate','gte','Date of awarded cannot be less than end date'),
    ]);

    this.dynamicForm.setValidators(this.customValidators());
    this.loadCustomValidators();
  }

  loadCustomValidators() {
    this.customErrors()['startdate'] = ['FormControlDateComparerNeq','FormControlDateComparerLt'];
    this.customErrors()['enddate'] = [
      'FormControlDateDifferenceGte',
      'FormControlDateComparerGt',
      'FormControlDateComparerLte',
    ];
    this.customErrors()['awardeddate'] = ['FormControlDateComparerGte'];

    if (this.dynamicForm) {
       this.dynamicForm.get('awardeddate')?.valueChanges.subscribe((data) => {
        const endDate = this.dynamicForm?.get('enddate');
        const completion = this.dynamicForm?.get('completion');
        if (completion?.value == 'yes' && !endDate?.value) {
          endDate?.setValue(data);
        }
      });
      this.dynamicForm.get('completion')?.valueChanges.subscribe((data) => {
        
        if (data == 'no') {
          this.dynamicForm?.get('enddate')?.clearValidators();
          this.dynamicForm?.get('enddate')?.updateValueAndValidity();
          this.dynamicForm?.get('enddate')?.setValue(null);

          this.dynamicForm?.get('awardeddate')?.clearValidators();
          this.dynamicForm?.get('awardeddate')?.updateValueAndValidity();
          this.dynamicForm?.get('awardeddate')?.setValue(new Date(1990, 0, 1));

          const filterdValidators = this.filterCustomValidators([4,5])
          this.dynamicForm?.setValidators(filterdValidators);
  
          this.dynamicForm?.hasValidator(FormControlDateComparer('awardeddate', 'enddate','gte', 'Date of award cannot be less than End date')
          )? this.dynamicForm.removeValidators( FormControlDateComparer( 'awardeddate', 'enddate', 'gte', 'Date of award cannot be less than End date')): '';
        } else {
          this.dynamicForm?.get('enddate')?.addValidators([ Validators.required,  DateComparer(this.today(), 'lte', 'End date cannot be greater than today.'),]);
          this.dynamicForm?.get('awardeddate')?.addValidators([ Validators.required,  DateComparer(this.today(), 'lte', 'Date of award cannot be greater than today.'),]);

          this.dynamicForm?.setValidators(this.customValidators());
          this.dynamicForm?.get('awardeddate')?.setValue(null);
          this.dynamicForm?.get('enddate')?.setValue(null);
        }
      });
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
