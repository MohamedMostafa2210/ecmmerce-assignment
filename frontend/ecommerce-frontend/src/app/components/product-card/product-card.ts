import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { Auth } from '../../services/auth';
import { ProductService } from '../../services/product';
import { ToastService } from '../../services/toast';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: any;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private auth: Auth,
    private productService: ProductService,
    private toast: ToastService,
  ) {}

  imageUrl(path: string) {
    return 'http://localhost:3001/' + path;
  }

  isAdmin() {
    return this.auth.getUser()?.role === 'admin';
  }

  deleteProduct() {
    if (!confirm('Delete Product ?')) return;

    this.productService.deleteProduct(this.product._id).subscribe({
      next: () => {
        this.toast.showSuccess('Deleted Successfully');
        location.reload();
      },
      error: (err) => {
        this.toast.showError(err.error?.massage || 'Failed to delete product');
      },
    });
  }

  addToCart() {
    if (!this.auth.isLogIn()) {
      this.toast.showError('Please login first');
      return;
    }
    
    this.cartService.addToCart(this.product._id).subscribe({
      next: () => {
        this.toast.showSuccess('Product Added To Cart');
      },
      error: (err) => {
        this.toast.showError(err.error?.massage || 'Failed to add to cart');
      },
    });
  }

  addToWishlist() {
    if (!this.auth.isLogIn()) {
      this.toast.showError('Please login first');
      return;
    }

    this.wishlistService.addToWishlist(this.product._id).subscribe({
      next: () => {
        this.toast.showSuccess('Added to Wishlist');
      },
      error: (err) => this.toast.showError(err.error?.massage || 'Failed to add to wishlist'),
    });
  }
}
