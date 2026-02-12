import { Component, OnInit } from '@angular/core';
import { ClaimsService, Claim } from '../claims.service';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css']
})
export class ClaimsListComponent implements OnInit {
  claims: Claim[] = [];
  displayedColumns: string[] = ['claimNumber', 'customerName', 'claimType', 'claimAmount', 'status', 'actions'];

  constructor(private claimsService: ClaimsService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimsService.getAll().subscribe({
      next: (claims) => this.claims = claims,
      error: (err) => console.error('Error loading claims:', err)
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'SUBMITTED': 'accent',
      'UNDER_REVIEW': 'primary',
      'APPROVED': 'primary',
      'REJECTED': 'warn',
      'PAID': 'primary',
      'CLOSED': 'default'
    };
    return colors[status] || 'default';
  }
}
