import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offers-form',
  templateUrl: './offers-form.component.html',
  styleUrls: ['./offers-form.component.css']
})
export class OffersFormComponent implements OnInit {
  offerForm!: FormGroup;
  calculatedPremium: number | null = null;
  isCalculating = false;

  insuranceTypes = [
    { value: 'HEALTH', label: 'Krankenversicherung' },
    { value: 'LIFE', label: 'Lebensversicherung' },
    { value: 'PROPERTY', label: 'Sachversicherung' },
    { value: 'VEHICLE', label: 'Fahrzeugversicherung' },
    { value: 'LIABILITY', label: 'Haftpflichtversicherung' }
  ];

  constructor(
    private fb: FormBuilder,
    private offersService: OffersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      insuranceType: ['', Validators.required],
      coverageAmount: [0, [Validators.required, Validators.min(0)]],
      deductible: [0, [Validators.required, Validators.min(0)]],
      notes: ['']
    });
  }

  calculatePremium(): void {
    if (this.offerForm.invalid) {
      return;
    }

    this.isCalculating = true;
    const formValue = this.offerForm.value;
    
    this.offersService.calculate({
      insuranceType: formValue.insuranceType,
      coverageAmount: formValue.coverageAmount,
      deductible: formValue.deductible
    }).subscribe({
      next: (result) => {
        this.calculatedPremium = result.premium;
        this.isCalculating = false;
        this.snackBar.open(`Berechnete Prämie: CHF ${result.premium}`, 'OK', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error calculating premium:', err);
        this.isCalculating = false;
        this.snackBar.open('Fehler bei der Berechnung', 'OK', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.offerForm.invalid) {
      return;
    }

    this.offersService.create(this.offerForm.value).subscribe({
      next: (offer) => {
        this.snackBar.open('Offerte erfolgreich erstellt', 'OK', { duration: 3000 });
        this.router.navigate(['/offers']);
      },
      error: (err) => {
        console.error('Error creating offer:', err);
        this.snackBar.open('Fehler beim Erstellen der Offerte', 'OK', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/offers']);
  }
}
