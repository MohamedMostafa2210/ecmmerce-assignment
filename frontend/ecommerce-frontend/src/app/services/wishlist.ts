import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  api = 'http://localhost:3001/wishlist';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `System ${token}`,
      }),
    };
  }

  getWishlist() {
    return this.http.get(`${this.api}/wishlist`, this.getHeaders());
  }

  addToWishlist(productId: string) {
    return this.http.post(`${this.api}/add-To-wishlist`, { productId }, this.getHeaders());
  }

  removeFromWishlist(productId: string) {
    return this.http.delete(`${this.api}/wishlist/${productId}`, this.getHeaders());
  }
}
