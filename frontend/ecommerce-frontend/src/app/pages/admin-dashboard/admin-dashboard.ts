import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { DashboardService } from '../../services/dashboard';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  products: any[] = [];
  stats: any = null;
  loadingStats = true;

  constructor(
    private productService: ProductService,
    private dashboardService: DashboardService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadProducts();
  }

  loadStats() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res: any) => {
        this.stats = res.data;
        this.loadingStats = false;
      },
      error: () => {
        this.loadingStats = false;
      },
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  editProduct(id: string) {
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toast.showSuccess('Deleted Successfully');
        this.loadProducts();
      },
      error: (err) => console.log(err),
    });
  }

  image(path: string) {
    return 'http://localhost:3001/' + path;
  }
}
