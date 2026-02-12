import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PoliciesService } from '../policies.service';

@Component({
  selector: 'app-policies-form',
  templateUrl: './policies-form.component.html',
  styleUrls: ['./policies-form.component.css']
})
export class PoliciesFormComponent implements OnInit {
  policyForm!: FormGroup;

  paymentFrequencies = [
    { value: 'MONTHLY', label: 'Monatlich' },
    { value: 'QUARTERLY', label: 'Vierteljährlich' },
    { value: 'SEMI_ANNUAL', label: 'Halbjährlich' },
    { value: 'ANNUAL', label: 'Jährlich' }
  ];

  constructor(
    private fb: FormBuilder,
    private policiesService: PoliciesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.policyForm = this.fb.group({
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      insuranceType: ['', Validators.required],
      coverageAmount: [0, [Validators.required, Validators.min(0)]],
      premium: [0, [Validators.required, Validators.min(0)]],
      deductible: [0, [Validators.required, Validators.min(0)]],
      paymentFrequency: ['MONTHLY', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.policyForm.invalid) {
      return;
    }

    this.policiesService.create(this.policyForm.value).subscribe({
      next: (policy) => {
        this.snackBar.open('Police erfolgreich erstellt', 'OK', { duration: 3000 });
        this.router.navigate(['/policies']);
      },
      error: (err) => {
        console.error('Error creating policy:', err);
        this.snackBar.open('Fehler beim Erstellen der Police', 'OK', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/policies']);
  }
}
