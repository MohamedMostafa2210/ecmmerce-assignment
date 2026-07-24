import { Auth } from './auth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'http://localhost:3001/product';

  constructor(
    private http: HttpClient,
    private Auth: Auth,
  ) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.api}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.api}/products/${id}`);
  }
}
