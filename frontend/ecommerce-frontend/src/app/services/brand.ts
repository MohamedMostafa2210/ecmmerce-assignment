import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private api = 'http://localhost:3001/brand';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getBrands(): Observable<any> {
    return this.http.get(`${this.api}/brands`);
  }

  createBrand(data: { name: string }): Observable<any> {
    return this.http.post(`${this.api}/create-brand`, data, this.auth.getAuthHeaders());
  }
}
