import { Component, OnInit } from '@angular/core';
import { PoliciesService, Policy } from '../policies.service';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.css']
})
export class PoliciesListComponent implements OnInit {
  policies: Policy[] = [];
  displayedColumns: string[] = ['policyNumber', 'customerName', 'insuranceType', 'premium', 'status', 'actions'];

  constructor(private policiesService: PoliciesService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policiesService.getAll().subscribe({
      next: (policies) => this.policies = policies,
      error: (err) => console.error('Error loading policies:', err)
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'PENDING': 'accent',
      'ACTIVE': 'primary',
      'SUSPENDED': 'warn',
      'CANCELLED': 'default',
      'EXPIRED': 'default'
    };
    return colors[status] || 'default';
  }
}
