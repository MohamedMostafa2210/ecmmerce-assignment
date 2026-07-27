import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private api = 'http://localhost:3001/review';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  getReviews(productId: string): Observable<any> {
    return this.http.get(`${this.api}/reviews/${productId}`);
  }

  addReview(data: { productId: string; comment: string; rating: number }): Observable<any> {
    return this.http.post(`${this.api}/add-review`, data, this.auth.getAuthHeaders());
  }

  updateReview(
    id: string,
    data: {
      comment?: string;
      rating?: number;
    },
  ): Observable<any> {
    return this.http.patch(`${this.api}/reviews/${id}`, data, this.auth.getAuthHeaders());
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.api}/reviews/${id}`, this.auth.getAuthHeaders());
  }
}
