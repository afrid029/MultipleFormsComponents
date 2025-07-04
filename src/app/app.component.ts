import { Component, OnInit,inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GetDataService } from './Services/get-data.service';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule, ToastPositionType } from 'primeng/toast';
import { DynamicFormService } from './Services/dynamic-form.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CredentialDocumentComponent } from './Components/credential-document/credential-document.component';
import { DegreeDocumentComponent } from './Components/degree-document/degree-document.component';
import { EmploymentDocumentComponent } from './Components/employment-document/employment-document.component';
import { PassportDocumentComponent } from './Components/passport-document/passport-document.component';
import { GoodStandingDocumentComponent } from './Components/good-standing-document/good-standing-document.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CommonModule, DataViewModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  visible = signal<boolean>(false);
  credentials = signal<any[]>([]);
  employment = signal<any[]>([]);
  degree = signal<any[]>([]);
  goodStanding = signal<any[]>([]);
  passport = signal<any[]>([]);
  filteredData = signal<any>({});
  editId = signal<number |undefined>(undefined);
  toastPosition = signal<ToastPositionType>('top-right');

  private _dataServ : GetDataService = inject(GetDataService);
  private _dynamicForm : DynamicFormService =  inject(DynamicFormService);
  private _ref : DynamicDialogRef = inject(DynamicDialogRef);

ngOnInit(): void {
  this.toastPosition.set(window.innerWidth <= 600 ? 'top-center' : 'top-right');
  this.credentials.set(this._dataServ.getCredData());
  this.degree.set(this._dataServ.getDegData());
  this.employment.set(this._dataServ.getEmpDate());
  this.passport.set(this._dataServ.getPassData());
  this.goodStanding.set(this._dataServ.getGoodStandData());
}
  
OpenCredModel(){
    this._ref = this._dynamicForm.CreateDynamicForm(CredentialDocumentComponent,'Credentials Document');
    this._ref.onClose.subscribe(data => {
      if(data) {
        const Id = this.credentials().length + 1;
        const newData = { Id: Id, ...data };
        this.credentials.update((current) => [newData, ...current]);
      }
    });

  }
showCredDialog(Id:number) {
    this.editId.set(Id);
  const fetched = this.credentials().filter((p: any) => p.Id == Id)
    this.filteredData.set(fetched[0]);
    
    this._ref = this._dynamicForm.UpdateDynamicForm(CredentialDocumentComponent,'Credentials Document', this.filteredData);
    this._ref.onClose.subscribe(data => {
      if(data) {
        this.credentials.update((user) =>
          user.map((us) =>
            us.Id === this.editId() ? { Id: this.editId(), ...data } : us
          )
        );
      }
    });
  }

OpenDegModel(){
    this._ref = this._dynamicForm.CreateDynamicForm(DegreeDocumentComponent,'Degree Document');
    this._ref.onClose.subscribe(data => {
      if(data) {
        const Id = this.degree().length + 1;
        const newData = { Id: Id, ...data };
        this.degree.update((current) => [newData, ...current]);
      }
    });

  }
showDegDialog(Id:number) {
     this.editId.set(Id);
  const fetched = this.degree().filter((p: any) => p.Id == Id)
    this.filteredData.set(fetched[0]);
    this._ref = this._dynamicForm.UpdateDynamicForm(DegreeDocumentComponent,'Degree Document', this.filteredData);
    this._ref.onClose.subscribe(data => {
      if(data) {
        this.degree.update((user) =>
          user.map((us) =>
            us.Id === this.editId() ? { Id: this.editId(), ...data } : us
          )
        );
      }
    });
    
  }
 
OpenEmpModel(){
    this._ref = this._dynamicForm.CreateDynamicForm(EmploymentDocumentComponent,'Employment Document');
    this._ref.onClose.subscribe(data => {
      if(data) {
        const Id = this.employment().length + 1;
        const newData = { Id: Id, ...data };
        this.employment.update((current) => [newData, ...current]);
      }
    });

  }
showEmpDialog(Id:number) {
   this.editId.set(Id);
  const fetched = this.employment().filter((p: any) => p.Id == Id)
    this.filteredData.set(fetched[0]);
    
    this._ref = this._dynamicForm.UpdateDynamicForm(EmploymentDocumentComponent,'Employment Document', this.filteredData);
    this._ref.onClose.subscribe(data => {
      if(data) {
        this.employment.update((user) =>
          user.map((us) =>
            us.Id === this.editId() ? { Id: this.editId(), ...data } : us
          )
        );
      }
    });
    
  }

OpenPassModel(){
    this._ref = this._dynamicForm.CreateDynamicForm(PassportDocumentComponent,'Identity Document');
    this._ref.onClose.subscribe(data => {
      if(data) {
        const Id = this.passport().length + 1;
        const newData = { Id: Id, ...data };
        this.passport.update((current) => [newData, ...current]);
      }
    });

  }
showPassDialog(Id:number) {
    this.editId.set(Id);
  const fetched = this.passport().filter((p: any) => p.Id == Id)
    this.filteredData.set(fetched[0]);
    
    this._ref = this._dynamicForm.UpdateDynamicForm(PassportDocumentComponent,'Identity Document', this.filteredData);
    this._ref.onClose.subscribe(data => {
      if(data) {
        this.passport.update((user) =>
          user.map((us) =>
            us.Id === this.editId() ? { Id: this.editId(), ...data } : us
          )
        );
      }
    });
    
  }

OpenStandModel(){
    this._ref = this._dynamicForm.CreateDynamicForm(GoodStandingDocumentComponent,'Good Standing Document');
    this._ref.onClose.subscribe(data => {
      if(data) {
        const Id = this.goodStanding().length + 1;
        const newData = { Id: Id, ...data };
        this.goodStanding.update((current) => [newData, ...current]);
      }
    });

  }
showStandDialog(Id:number) {
   this.editId.set(Id);
  const fetched = this.goodStanding().filter((p: any) => p.Id == Id)
    this.filteredData.set(fetched[0]);
    
    this._ref = this._dynamicForm.UpdateDynamicForm(GoodStandingDocumentComponent,'Good Standing Document', this.filteredData);
    this._ref.onClose.subscribe(data => {
      if(data) {
        this.goodStanding.update((user) =>
          user.map((us) =>
            us.Id === this.editId() ? { Id: this.editId(), ...data } : us
          )
        );
      }
    });
    
  }
}
