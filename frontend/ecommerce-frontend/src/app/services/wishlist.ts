import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  api = 'http://localhost:3001/wishlist';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getWishlist() {
    return this.http.get(`${this.api}/wishlist`, this.auth.getAuthHeaders());
  }

  addToWishlist(productId: string) {
    return this.http.post(`${this.api}/add-To-wishlist`, { productId }, this.auth.getAuthHeaders());
  }

  removeFromWishlist(productId: string) {
    return this.http.delete(`${this.api}/wishlist/${productId}`, this.auth.getAuthHeaders());
  }
  clearWishlist() {
    return this.http.delete(`${this.api}/wishlist`, this.auth.getAuthHeaders());
  }
}
