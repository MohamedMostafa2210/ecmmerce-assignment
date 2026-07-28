import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'confirm';

  onOk?: () => void;
  onCancel?: () => void;
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private counter = 0;

  private toastSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastSubject.asObservable();

  showSuccess(message: string) {
    this.add(message, 'success');
  }

  showError(message: string) {
    this.add(message, 'error');
  }

  showWarning(message: string) {
    this.add(message, 'warning');
  }
  confirm(message: string, onOk: () => void, onCancel?: () => void) {
    const toast: ToastMessage = {
      id: ++this.counter,
      text: message,
      type: 'confirm',
      onOk,
      onCancel,
    };

    this.toastSubject.next([...this.toastSubject.value, toast]);
  }
  showInfo(message: string) {
    this.add(message, 'info');
  }
  private add(text: string, type: ToastMessage['type']) {
    const toast: ToastMessage = {
      id: ++this.counter,
      text,
      type,
    };

    this.toastSubject.next([...this.toastSubject.value, toast]);

    setTimeout(() => {
      this.removeToast(toast.id);
    }, 4000);
  }

  removeToast(id: number) {
    this.toastSubject.next(this.toastSubject.value.filter((x) => x.id !== id));
  }
}
