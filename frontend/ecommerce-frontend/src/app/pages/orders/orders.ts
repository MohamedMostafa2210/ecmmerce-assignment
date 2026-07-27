import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderService } from '../../services/order';
import { DashboardService } from '../../services/dashboard';
import { Auth } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders: any[] = [];
  loading = true;
  error = '';
  isAdmin = false;

  constructor(
    private orderService: OrderService,
    private dashboardService: DashboardService,
    private auth: Auth,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;

    const request = this.isAdmin
      ? this.dashboardService.getDashboardOrders()
      : this.orderService.getOrders();

    request.subscribe({
      next: (res: any) => {
        this.orders = res.data || [];
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error?.massage || err.error?.message || 'Failed to load orders';
        this.toast.showError(this.error);
      },
    });
  }

  cancelOrder(orderId: string): void {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.toast.showSuccess('Order cancelled successfully');
        this.loadOrders();
      },
      error: (err: any) => {
        this.toast.showError(err.error?.massage || err.error?.message || 'Failed to cancel order');
      },
    });
  }

  updateStatus(orderId: string, event: Event): void {
    const status = (event.target as HTMLSelectElement).value;

    if (!status) return;

    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.toast.showSuccess('Order status updated');
        this.loadOrders();
      },
      error: (err: any) => {
        this.toast.showError(
          err.error?.massage || err.error?.message || 'Failed to update order status',
        );
      },
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
      case 'placed':
        return 'badge-pending';

      case 'confirmed':
        return 'badge-confirmed';

      case 'packed':
        return 'badge-packed';

      case 'shipped':
        return 'badge-shipped';

      case 'delivered':
        return 'badge-delivered';

      case 'cancelled':
      case 'canceled':
        return 'badge-cancelled';

      default:
        return 'badge-secondary';
    }
  }
}
