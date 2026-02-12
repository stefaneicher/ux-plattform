import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-claims-form',
  templateUrl: './claims-form.component.html',
  styleUrls: ['./claims-form.component.css']
})
export class ClaimsFormComponent implements OnInit {
  claimForm!: FormGroup;

  claimTypes = [
    { value: 'MEDICAL', label: 'Medizinisch' },
    { value: 'ACCIDENT', label: 'Unfall' },
    { value: 'PROPERTY_DAMAGE', label: 'Sachschaden' },
    { value: 'LIABILITY', label: 'Haftpflicht' },
    { value: 'OTHER', label: 'Sonstiges' }
  ];

  constructor(
    private fb: FormBuilder,
    private claimsService: ClaimsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      policyId: ['', Validators.required],
      policyNumber: ['', Validators.required],
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      claimType: ['', Validators.required],
      claimAmount: [0, [Validators.required, Validators.min(0)]],
      incidentDate: [new Date(), Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.claimForm.invalid) {
      return;
    }

    this.claimsService.create(this.claimForm.value).subscribe({
      next: (claim) => {
        this.snackBar.open('Leistung erfolgreich erfasst', 'OK', { duration: 3000 });
        this.router.navigate(['/claims']);
      },
      error: (err) => {
        console.error('Error creating claim:', err);
        this.snackBar.open('Fehler beim Erfassen der Leistung', 'OK', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/claims']);
  }
}
