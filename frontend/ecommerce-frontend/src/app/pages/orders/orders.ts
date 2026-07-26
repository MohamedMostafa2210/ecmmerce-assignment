import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { DashboardService } from '../../services/dashboard';
import { Auth } from '../../services/auth';

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
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    if (this.isAdmin) {
      this.dashboardService.getDashboardOrders().subscribe({
        next: (res: any) => {
          this.orders = res.data || [];
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.error?.massage || 'Failed to load orders';
          this.loading = false;
        },
      });
    } else {
      this.orderService.getOrders().subscribe({
        next: (res: any) => {
          this.orders = res.data || [];
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.error?.massage || 'Failed to load orders';
          this.loading = false;
        },
      });
    }
  }

  cancelOrder(orderId: string): void {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        alert('Order cancelled successfully');
        this.loadOrders();
      },
      error: (err: any) => {
        alert(err.error?.massage || 'Failed to cancel order');
      },
    });
  }

  updateStatus(orderId: string, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    if (!newStatus) return;

    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        alert('Order status updated');
        this.loadOrders();
      },
      error: (err: any) => {
        alert(err.error?.massage || 'Failed to update order status');
      },
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'placed':
      case 'pending':
        return 'badge-pending';
      case 'shipped':
      case 'on way':
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
