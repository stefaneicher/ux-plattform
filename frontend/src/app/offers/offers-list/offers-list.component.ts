import { Component, OnInit } from '@angular/core';
import { OffersService, Offer } from '../offers.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
  offers: Offer[] = [];
  displayedColumns: string[] = ['customerName', 'insuranceType', 'coverageAmount', 'calculatedPremium', 'status', 'actions'];

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offersService.getAll().subscribe({
      next: (offers) => this.offers = offers,
      error: (err) => console.error('Error loading offers:', err)
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'DRAFT': 'default',
      'CALCULATED': 'primary',
      'SENT': 'accent',
      'ACCEPTED': 'success',
      'REJECTED': 'warn',
      'EXPIRED': 'default'
    };
    return colors[status] || 'default';
  }
}
