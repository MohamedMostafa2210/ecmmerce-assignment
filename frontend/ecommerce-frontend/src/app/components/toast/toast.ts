import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../services/toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit, OnDestroy {
  toasts: ToastMessage[] = [];
  private sub!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.sub = this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  dismiss(id: number) {
    this.toastService.removeToast(id);
  }

  ok(toast: ToastMessage) {
    toast.onOk?.();
    this.dismiss(toast.id);
  }

  cancel(toast: ToastMessage) {
    toast.onCancel?.();
    this.dismiss(toast.id);
  }
}
