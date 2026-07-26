import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private api = 'http://localhost:3001/Sub-Category';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getSubCategories(): Observable<any> {
    return this.http.get(`${this.api}/Sub-Category`);
  }

  createSubCategory(data: { name: string; categoryId?: string }): Observable<any> {
    return this.http.post(`${this.api}/create-Sub-Category`, data, this.auth.getAuthHeaders());
  }
}
