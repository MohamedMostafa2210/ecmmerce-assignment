import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private api = 'http://localhost:3001/dashboard';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.api}/dashboard`, this.auth.getAuthHeaders());
  }

  getDashboardUsers(): Observable<any> {
    return this.http.get(`${this.api}/dashboard/users`, this.auth.getAuthHeaders());
  }

  getDashboardOrders(): Observable<any> {
    return this.http.get(`${this.api}/dashboard/orders`, this.auth.getAuthHeaders());
  }

  getDashboardProducts(): Observable<any> {
    return this.http.get(`${this.api}/dashboard/products`, this.auth.getAuthHeaders());
  }
}
