import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'http://localhost:3001/product';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.api}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.api}/products/${id}`);
  }

  createProduct(data: FormData) {
    return this.http.post(`${this.api}/create-product`, data, this.auth.getAuthHeaders());
  }

  updateProduct(id: string, data: Record<string, unknown>) {
    return this.http.patch(`${this.api}/products/${id}`, data, this.auth.getAuthHeaders());
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/products/${id}`, this.auth.getAuthHeaders());
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.api}/products?search=${encodeURIComponent(query)}`);
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.api}/products/category/${categoryId}`);
  }
}
