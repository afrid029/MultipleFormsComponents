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
import { ToastService } from '../../Services/toast.service';
import { DateComparer } from '../../Validators/DateComparer.validator';
import { FormControlDateComparer } from '../../Validators/FormControlDateComparer.validator';
import { FormControlDateDifference } from '../../Validators/FormControlDateDifference.validator';
import { LengthRestriction } from '../../Validators/LengthRestriction.validator';
import { DateFormatter } from '../../Validators/DateFormatter.formatter';

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
  styleUrl: './employment-document.component.scss',
})
export class EmploymentDocumentComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);
  customErrors = signal<Record<string, string[]>>({});
  customValidators = signal<ValidatorFn[]>([]);
  today = signal<Date>(new Date());
  dob = signal<Date>(new Date(2012, 4, 24));
  employmentType = signal<Record<string, string>[]>([]);
  countries = signal<Record<string, string>[]>([]);
  stateOptions = signal<Record<string, string>[]>([]);
  slideOptions = signal<Record<string, string>[]>([]);
  minDate = signal<Date | undefined>(undefined);
  editData = signal<any>({});
    currentControl = signal<string>('');

  private _fb: FormBuilder = inject(FormBuilder);
  private _dataServ: GetDataService = inject(GetDataService);
  private _toastServ: ToastService = inject(ToastService);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);
  
  private startdateValidator = signal<ValidatorFn[]>([
    Validators.required,
    DateComparer(  this.today(),  'lte',  'Job start date cannot be greater than today'),
    DateComparer(  this.dob(),  'gt',  'Job start date should be greater than date of birth'),
    FormControlDateComparer('startdate','enddate','lte','Job start date cannot be greater than end date.'),
    FormControlDateDifference('startdate','enddate',1,'month','gte','Job start date and end date should have atleast one month gap'),
  ])
  private enddateValidator = signal <ValidatorFn[]>([
    Validators.required,
    DateComparer(this.today(),'lte','Job end date cannot be greater than today'),
    DateComparer(this.dob(),'gt','Job end date should be greater than date of birth'),
    FormControlDateComparer('enddate','startdate','gte','Job end date cannot be less than start date.'),
    FormControlDateComparer('enddate','startdate','neq','Job end date cannot be the same as start date.'),
    FormControlDateDifference('enddate','startdate',1,'month','gte','Job end date and start date should have atleast one month gap'),
  ])
  private phoneValidator = signal<ValidatorFn[]>([
     LengthRestriction(7,'gte','Phone number length should not be less than 7 digits.'),
     LengthRestriction(15,'lte','Phone number length should not be greater than 15 digits.'),
  ])

  ngOnInit(): void {
    this.employmentType.set(this._dataServ.getEmploymentType());
    this.countries.set(this._dataServ.getCountries());
    this.stateOptions.set(this._dataServ.getYesOrNo());
    this.slideOptions.set(this._dataServ.getSlider());
    this.minDate.set(
      new Date(
        this.today().getFullYear() - 10,
        this.today().getMonth(),
        this.today().getDate()
      )
    );

    this.dynamicForm = this._fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      country: ['', [Validators.required]],
      employmenttype: ['', [Validators.required]],
      startdate: [ '',this.startdateValidator()],
      enddate: ['', this.enddateValidator()],
      supervisor: [''],
      email: ['', [Validators.email]],
      phone: [null , this.phoneValidator()],
      iscurrent: ['no', [Validators.required]],
      contactcurrent: ['no', []],
    });


    this.loadCustomValidators();
  }

  loadCustomValidators() {

    if (this.dynamicForm) {
      this.dynamicForm?.get('iscurrent')?.valueChanges.subscribe((data) => {
        const endDate = this.dynamicForm?.get('enddate');
        if (data == 'yes') {
          endDate?.setValue(new Date());
          endDate?.disable();
          this.dynamicForm
            ?.get('contactcurrent')
            ?.addValidators(Validators.required);
          // this.dynamicForm?.setValidators([]);
          this.dynamicForm?.controls['startdate'].setValidators([this.startdateValidator()[0],this.startdateValidator()[1],this.startdateValidator()[2]]);
          this.dynamicForm?.controls['startdate'].updateValueAndValidity({emitEvent : false});
          this.dynamicForm?.controls['enddate'].setValidators([this.enddateValidator()[0],this.enddateValidator()[1],this.enddateValidator()[2]])
          this.dynamicForm?.controls['enddate'].updateValueAndValidity({emitEvent : false});

        } else {
          endDate?.enable();
          this.dynamicForm
            ?.get('contactcurrent')
            ?.removeValidators(Validators.required);
          
          this.dynamicForm?.controls['startdate'].setValidators(this.startdateValidator())
          this.dynamicForm?.controls['startdate'].updateValueAndValidity({emitEvent : false});
          this.dynamicForm?.controls['enddate'].setValidators(this.enddateValidator());
          this.dynamicForm?.controls['enddate'].updateValueAndValidity({emitEvent : false});

        }
        this.dynamicForm?.get('contactcurrent')?.updateValueAndValidity({emitEvent : false});
      });

      this.dynamicForm.valueChanges.subscribe((data) => {
        if(data.startdate && data.enddate && data.startdate < data.enddate) {
          const enddate = DateFormatter(data.enddate);
          const startdate = DateFormatter(data.startdate);
          const diffInMs = enddate.getTime() - startdate.getTime();
          const diffInMns = diffInMs / (1000 * 60 * 60 * 24 * 30)
          if(diffInMns >= 1) {
            this.dynamicForm?.controls['startdate'].updateValueAndValidity({emitEvent: false});
            this.dynamicForm?.controls['enddate'].updateValueAndValidity({emitEvent : false});
          } else {
            if(this.currentControl() == 'startdate'){
               this.dynamicForm?.controls['startdate'].updateValueAndValidity({emitEvent: false});
            } else if(this.currentControl() == 'enddate') {
              this.dynamicForm?.controls['enddate'].updateValueAndValidity({emitEvent : false});
            }
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
