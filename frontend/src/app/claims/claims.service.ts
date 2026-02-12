import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Claim {
  _id?: string;
  claimNumber: string;
  policyId: string;
  policyNumber: string;
  customerId: string;
  customerName: string;
  claimType: string;
  claimAmount: number;
  approvedAmount?: number;
  status: string;
  incidentDate: Date;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  private apiUrl = `${environment.apiUrl}/claims`;

  constructor(private http: HttpClient) {}

  create(claim: Partial<Claim>): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim);
  }

  getAll(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/${id}`);
  }

  startReview(id: string): Observable<Claim> {
    return this.http.post<Claim>(`${this.apiUrl}/${id}/review/start`, {});
  }

  review(id: string, decision: 'APPROVED' | 'REJECTED', approvedAmount?: number): Observable<Claim> {
    return this.http.post<Claim>(`${this.apiUrl}/${id}/review`, { decision, approvedAmount });
  }

  markAsPaid(id: string): Observable<Claim> {
    return this.http.post<Claim>(`${this.apiUrl}/${id}/pay`, {});
  }
}
