import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3001/auth';
  constructor(private http: HttpClient) {}

  getBearerKey(): string {
    return this.isAdmin() ? 'System' : 'Bearer';
  }
  getAuthHeaders() {
    const token = this.getToken();

    return {
      headers: new HttpHeaders({
        Authorization: `${this.getBearerKey()} ${token}`,
      }),
    };
  }
  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.clear();
  }
  isLogIn() {
    return !!localStorage.getItem('token');
  }
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  isAdmin() {
    const user = this.getUser();
    return user?.role === 'admin';
  }
}
