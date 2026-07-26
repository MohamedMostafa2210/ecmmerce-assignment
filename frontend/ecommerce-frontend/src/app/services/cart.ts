import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  api = 'http://localhost:3001/cart';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getCart() {
    return this.http.get(`${this.api}/cart`, this.auth.getAuthHeaders());
  }

  addToCart(productId: string) {
    return this.http.post(
      `${this.api}/add-to-cart`,
      {
        productId,
        quantity: 1,
      },
      this.auth.getAuthHeaders(),
    );
  }

  updateCart(productId: string, quantity: number) {
    return this.http.patch(
      `${this.api}/cart`,
      {
        productId,
        quantity,
      },
      this.auth.getAuthHeaders(),
    );
  }

  removeFromCart(productId: string) {
    return this.http.delete(`${this.api}/cart/${productId}`, this.auth.getAuthHeaders());
  }
  clearCart() {
    return this.http.delete(`${this.api}/cart`, this.auth.getAuthHeaders());
  }
}
