import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private api = 'http://localhost:3001/address';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getAddresses(): Observable<any> {
    return this.http.get(`${this.api}/addresses`, this.auth.getAuthHeaders());
  }

  addAddress(data: any): Observable<any> {
    return this.http.post(`${this.api}/add-address`, data, this.auth.getAuthHeaders());
  }

  updateAddress(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/addresses/${id}`, data, this.auth.getAuthHeaders());
  }

  deleteAddress(id: string): Observable<any> {
    return this.http.delete(`${this.api}/addresses/${id}`, this.auth.getAuthHeaders());
  }
}
