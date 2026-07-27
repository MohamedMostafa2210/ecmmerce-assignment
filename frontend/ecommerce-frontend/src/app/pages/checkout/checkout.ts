import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { AddressService } from '../../services/address';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  cart: any = null;

  addresses: any[] = [];

  loading = true;
  submitting = false;

  addressId = '';

  paymentMethod = 'Cash';

  coupon = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private addressService: AddressService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.loadAddresses();
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

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: (res: any) => {
        this.addresses = res.data || [];

        if (this.addresses.length) {
          const defaultAddress = this.addresses.find((a: any) => a.isDefault) || this.addresses[0];

          this.addressId = defaultAddress._id;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTotal(): number {
    if (!this.cart?.products?.length) return 0;

    return this.cart.products.reduce(
      (total: number, item: any) => total + item.productId.finalPrice * item.quantity,
      0,
    );
  }

  placeOrder(): void {
    if (!this.addressId) {
      this.toast.showError('Please select an address');
      return;
    }

    if (!this.cart?.products?.length) {
      this.toast.showError('Cart is empty');
      return;
    }

    this.submitting = true;

    const items = this.cart.products.map((item: any) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const payload = {
      addressId: this.addressId,
      paymentMethod: this.paymentMethod,
      coupon: this.coupon || undefined,
      items,
    };

    this.orderService.createOrder(payload).subscribe({
      next: () => {
        this.cartService.clearCart().subscribe({
          next: () => {
            this.toast.showSuccess('Order placed successfully');
            this.router.navigate(['/orders']);
          },
          error: () => {
            this.router.navigate(['/orders']);
          },
        });
      },
      error: (err) => {
        this.submitting = false;
        alert(err.error?.massage || err.error?.message);
      },
    });
  }
}
