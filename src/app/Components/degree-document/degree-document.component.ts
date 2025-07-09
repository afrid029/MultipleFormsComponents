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
import { ButtonComponent } from '../../prime-button/button/button.component';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';
import { ToastService } from '../../Services/toast.service';
import { DateComparer } from '../../Validators/DateComparer.validator';
import { FormControlDateComparer } from '../../Validators/FormControlDateComparer.validator';
import { FormControlDateDifference } from '../../Validators/FormControlDateDifference.validator';
import { GetDataService } from '../../Services/get-data.service';
import { AwardedDateValidator, EndDateValidator, StartDateEndDateAwardDate, StartDateValidator } from '../../Validators/degree.validator';
import { merge } from 'rxjs';
import { DateFormatter } from '../../Validators/DateFormatter.formatter';
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
  styleUrl: './degree-document.component.scss',
})
export class DegreeDocumentComponent
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
  degreeType = signal<Record<string, string>[]>([]);
  studyMode = signal<Record<string, string>[]>([]);
  countries = signal<Record<string, string>[]>([]);
  completionOptions = signal<Record<string, string>[]>([]);
  minDate = signal<Date | undefined>(undefined);
  editData = signal<any>({});
   currentControl = signal<string>('');


//  startDateValue = signal<any>(this.dynamicForm?.get('startdate')?.value ?? null);

  private _fb: FormBuilder = inject(FormBuilder);
  private _toastServ: ToastService = inject(ToastService);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _dataServ: GetDataService = inject(GetDataService);

  private startdateValidations = signal<ValidatorFn[]> ([
         Validators.required,
         DateComparer(this.today(),'lte','Start date cannot be greater than today.'),
         DateComparer(this.dob(),'gt','Start Date should be greater than date of birth.'),
         FormControlDateDifference('startdate','enddate',1,'day','gte','Start date and end date should have at least 1 day gap.'),
         FormControlDateComparer('startdate','enddate','lt','Start date cannot be greater than end date.')]);
   
   private enddateValidations = signal<ValidatorFn[]>([
         Validators.required,
         DateComparer(this.today(),'lte','End date cannot be greater than today.'),
         FormControlDateComparer('enddate','startdate','neq','End date and start date cannot be the same'),
         FormControlDateComparer('enddate','startdate','gt','End date cannot be less than start date.'),
         FormControlDateComparer('enddate','awardeddate','lte','End date cannot be greater than date of awarded')])
   
   private awardedateValidations = signal<ValidatorFn[]>([
         Validators.required,
         DateComparer(this.today(),'lte','Date of awarded cannot be greater than today.'),
         FormControlDateComparer('awardeddate','enddate','gte','Date of awarded cannot be less than end date')])

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

    this.dynamicForm = this._fb.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      country: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      degreetype: ['', [Validators.required]],
      studymode: ['', [Validators.required]],
      completion: ['yes', [Validators.required]],
      startdate: ['', this.startdateValidations()],
      enddate: ['', this.enddateValidations()],
      awardeddate: ['', this.awardedateValidations()],
    });
    
    this.loadCustomValidators();
  }

  loadCustomValidators() {

    if (this.dynamicForm) {
      this.dynamicForm.valueChanges.subscribe((data) => {
       
        if (this.currentControl() == 'startdate') {
          if(data.startdate && data.enddate && data.startdate < data.enddate ) {
            if(data.awardeddate && data.awardeddate >= data.enddate){
              this.dynamicForm?.controls['enddate'].setValidators([this.enddateValidations()[0],this.enddateValidations()[1],this.enddateValidations()[2],this.enddateValidations()[3]])
            }else {
              this.dynamicForm?.controls['enddate'].setValidators(this.enddateValidations())
            }
            this.dynamicForm?.get('enddate')?.updateValueAndValidity({emitEvent: false});
          }
        } else if(this.currentControl() == 'enddate') {
          if(data.startdate && data.enddate && data.startdate < data.enddate) {
            this.dynamicForm?.get('startdate')?.updateValueAndValidity({emitEvent: false});
          }
          if(data.awardeddate && data.enddate && data.awardeddate >= data.enddate) {
            this.dynamicForm?.get('awardeddate')?.updateValueAndValidity({emitEvent: false});
          }
          this.dynamicForm?.controls['enddate'].setValidators(this.enddateValidations())
          this.dynamicForm?.get('enddate')?.updateValueAndValidity({emitEvent: false});
        } else if(this.currentControl() == 'awardeddate') {
          if(data.awardeddate && data.enddate && data.awardeddate >= data.enddate) {
             if(data.startdate && data.startdate < data.enddate ){
               this.dynamicForm?.controls['enddate'].setValidators([this.enddateValidations()[0],this.enddateValidations()[1],this.enddateValidations()[4]])
            }else {
              this.dynamicForm?.controls['enddate'].setValidators(this.enddateValidations())
             }
             this.dynamicForm?.get('enddate')?.updateValueAndValidity({emitEvent: false});
          }
        }
        
      })

      this.dynamicForm.get('awardeddate')?.valueChanges.subscribe((data) => {
        const endDate = this.dynamicForm?.get('enddate');
        const completion = this.dynamicForm?.get('completion');
        if (completion?.value == 'yes' && !endDate?.value) {
          endDate?.setValue(data);
        }
      });

      this.dynamicForm.get('completion')?.valueChanges.subscribe((data) => {
        if (data == 'no') {
          this.dynamicForm?.get('enddate')?.setValidators([]);
          this.dynamicForm?.get('enddate')?.updateValueAndValidity();
          this.dynamicForm?.get('enddate')?.setValue(null);

          this.dynamicForm?.get('awardeddate')?.setValidators([]);
          this.dynamicForm?.get('awardeddate')?.updateValueAndValidity();
          this.dynamicForm?.get('awardeddate')?.setValue(new Date(1990, 0, 1));

        } else {
  
          this.dynamicForm?.get('enddate')?.setValidators(this.enddateValidations())
          this.dynamicForm?.get('enddate')?.updateValueAndValidity();
          this.dynamicForm?.get('awardeddate')?.setValidators(this.awardedateValidations())
           this.dynamicForm?.get('awardeddate')?.updateValueAndValidity();
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

    setCurrent($event : string) {
    // console.log($event);
    this.currentControl.set($event);
    
  }

  ngOnDestroy(): void {
    this.editData.set({});
  }

  onSubmit() {
    this.loading.set(true);
    this.dynamicForm?.controls['enddate'].setValidators(this.enddateValidations());
    // this.dynamicForm?.controls['enddate'].updateValueAndValidity();
    console.log(this.dynamicForm?.controls['enddate'].errors);
    
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
