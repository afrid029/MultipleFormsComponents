import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _messageServ : MessageService = inject(MessageService)
  showToastError(summary: string, detail: string) {
     this._messageServ.add({ severity: 'error', summary: summary, detail: detail, life: 3000 });;
  }
  showToastSuccess(summary: string, detail: string) {
     this._messageServ.add({ severity: 'success', summary: summary, detail: detail, life: 3000 });;
  }
}
