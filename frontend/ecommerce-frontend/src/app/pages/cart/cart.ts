import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cart: any = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        console.log('Cart:', res);
        this.cart = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  increase(item: any) {
    this.cartService
      .updateCart(item.productId._id, item.quantity + 1)
      .subscribe(() => this.loadCart());
  }

  decrease(item: any) {
    if (item.quantity <= 1) return;

    this.cartService
      .updateCart(item.productId._id, item.quantity - 1)
      .subscribe(() => this.loadCart());
  }

  remove(item: any) {
    this.cartService.removeFromCart(item.productId._id).subscribe(() => this.loadCart());
  }
  clearCart() {
    if (!confirm('Clear Cart ?')) return;

    this.cartService.clearCart().subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTotal() {
    if (!this.cart?.products) return 0;

    return this.cart.products.reduce(
      (total: number, item: any) => total + item.productId.finalPrice * item.quantity,
      0,
    );
  }
}
