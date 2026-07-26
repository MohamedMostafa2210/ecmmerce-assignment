import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = 'http://localhost:3001/category';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.api}/categories`);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.api}/categories/${id}`);
  }

  createCategory(data: { name: string }): Observable<any> {
    return this.http.post(`${this.api}/create-category`, data, this.auth.getAuthHeaders());
  }
}
