import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private counter = 0;
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  showSuccess(text: string) {
    this.addToast(text, 'success');
  }

  showError(text: string) {
    this.addToast(text, 'error');
  }

  private addToast(text: string, type: 'success' | 'error') {
    const id = ++this.counter;
    const toast: ToastMessage = { id, text, type };
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    setTimeout(() => {
      this.removeToast(id);
    }, 3500);
  }

  removeToast(id: number) {
    const current = this.toastsSubject.value.filter((t) => t.id !== id);
    this.toastsSubject.next(current);
  }
}
