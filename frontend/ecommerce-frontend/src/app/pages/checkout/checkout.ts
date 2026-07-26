import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  cart: any = null;
  loading = true;
  submitting = false;

  addressId = 'default_address_1';
  paymentMethod = 'cash';
  coupon = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cart = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getTotal(): number {
    if (!this.cart?.products) return 0;
    return this.cart.products.reduce(
      (acc: number, item: any) => acc + item.productId.finalPrice * item.quantity,
      0,
    );
  }

  placeOrder(): void {
    if (!this.addressId.trim()) {
      alert('Please provide a delivery address.');
      return;
    }
    if (!this.cart?.products?.length) {
      alert('Your cart is empty.');
      return;
    }

    this.submitting = true;

    const items = this.cart.products.map((item: any) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const orderPayload = {
      addressId: this.addressId,
      paymentMethod: this.paymentMethod,
      coupon: this.coupon.trim() || undefined,
      items,
    };

    this.orderService.createOrder(orderPayload).subscribe({
      next: () => {
        // Clear cart after successful order creation
        this.cartService.clearCart().subscribe({
          next: () => {
            alert('🎉 Order Placed Successfully!');
            this.router.navigate(['/orders']);
          },
          error: () => {
            alert('Order created successfully!');
            this.router.navigate(['/orders']);
          },
        });
      },
      error: (err: any) => {
        this.submitting = false;
        alert(err.error?.massage || 'Failed to place order.');
      },
    });
  }
}
