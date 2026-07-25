import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { Auth } from '../../services/auth';
import { ProductService } from '../../services/product';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
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
        alert('Deleted Successfully');
        location.reload();
      },
      error: (err) => console.log(err),
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product._id).subscribe({
      next: () => {
        alert('Product Added To Cart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishlist() {
    this.wishlistService.addToWishlist(this.product._id).subscribe({
      next: () => {
        alert('Added to Wishlist ❤️');
      },
      error: (err) => console.log(err),
    });
  }
}
