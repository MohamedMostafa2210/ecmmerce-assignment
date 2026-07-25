import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'http://localhost:3001/product';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `System ${token}`,
      }),
    };
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.api}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.api}/products/${id}`);
  }

  createProduct(data: FormData) {
    return this.http.post(`${this.api}/create-product`, data, this.getHeaders());
  }

  updateProduct(id: string, data: FormData) {
    return this.http.patch(`${this.api}/products/${id}`, data, this.getHeaders());
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/products/${id}`, this.getHeaders());
  }
}
