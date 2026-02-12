import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Policy {
  _id?: string;
  policyNumber: string;
  customerId: string;
  customerName: string;
  insuranceType: string;
  coverageAmount: number;
  premium: number;
  deductible: number;
  status: string;
  paymentFrequency: string;
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  private apiUrl = `${environment.apiUrl}/policies`;

  constructor(private http: HttpClient) {}

  create(policy: Partial<Policy>): Observable<Policy> {
    return this.http.post<Policy>(this.apiUrl, policy);
  }

  getAll(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/${id}`);
  }

  activate(id: string): Observable<Policy> {
    return this.http.post<Policy>(`${this.apiUrl}/${id}/activate`, {});
  }

  cancel(id: string, reason?: string): Observable<Policy> {
    return this.http.post<Policy>(`${this.apiUrl}/${id}/cancel`, { reason });
  }
}
