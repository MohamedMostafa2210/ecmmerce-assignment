import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private api = 'http://localhost:3001/order';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.api}/add-order`, data, this.auth.getAuthHeaders());
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.api}/orders`, this.auth.getAuthHeaders());
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.api}/orders/${id}`, this.auth.getAuthHeaders());
  }

  cancelOrder(id: string): Observable<any> {
    return this.http.patch(`${this.api}/orders/cancel/${id}`, {}, this.auth.getAuthHeaders());
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.patch(
      `${this.api}/orders/status/${id}`,
      { status },
      this.auth.getAuthHeaders(),
    );
  }
}
