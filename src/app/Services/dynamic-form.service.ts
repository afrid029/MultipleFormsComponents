import { inject, Injectable, Signal, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private _dialogService: DialogService = inject(DialogService);

  CreateDynamicForm(component : Type<any>, header: string): DynamicDialogRef {
    return this._dialogService.open(component, {
      closable: true,
      header: header,
      modal : true,
      appendTo : "body"
    });
  }

  UpdateDynamicForm(component : Type<any>, header: string, data: Signal<any>): DynamicDialogRef {
    return this._dialogService.open(component, {
      closable: true,
      header: header,
      modal : true,
      data : data()
    });
  }
}
