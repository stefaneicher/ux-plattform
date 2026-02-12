import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Offer {
  _id?: string;
  customerId: string;
  customerName: string;
  insuranceType: string;
  coverageAmount: number;
  deductible: number;
  calculatedPremium?: number;
  riskFactor?: number;
  status: string;
  validUntil?: Date;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiUrl = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) {}

  calculate(data: any): Observable<{ premium: number; riskFactor: number }> {
    return this.http.post<{ premium: number; riskFactor: number }>(`${this.apiUrl}/calculate`, data);
  }

  create(offer: Partial<Offer>): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }

  getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/${id}`);
  }

  calculateAndSave(id: string, data: any): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/${id}/calculate`, data);
  }

  updateStatus(id: string, status: string): Observable<Offer> {
    return this.http.patch<Offer>(`${this.apiUrl}/${id}/status`, { status });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
