import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  api = 'http://localhost:3001/cart';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `System ${token}`,
      }),
    };
  }

  getCart() {
    return this.http.get(`${this.api}/cart`, this.getHeaders());
  }

  addToCart(productId: string) {
    return this.http.post(
      `${this.api}/add-to-cart`,
      {
        productId,
        quantity: 1,
      },
      this.getHeaders(),
    );
  }

  updateCart(productId: string, quantity: number) {
    return this.http.patch(
      `${this.api}/cart`,
      {
        productId,
        quantity,
      },
      this.getHeaders(),
    );
  }

  removeFromCart(productId: string) {
    return this.http.delete(`${this.api}/cart/${productId}`, this.getHeaders());
  }
}
