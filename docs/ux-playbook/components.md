# Komponenten-Bibliothek: Enterprise UX Design System

## Übersicht

Die Enterprise Komponenten-Bibliothek basiert auf **Angular Material** und erweitert diese mit firmenspezifischen Styling, Patterns und Business-Komponenten.

## Architektur: 3-Layer-System

```
┌─────────────────────────────────────┐
│  Layer 3: Business Components       │
│  (ux-customer-card, ux-timeline)  │
├─────────────────────────────────────┤
│  Layer 2: UX Design System         │
│  (ux-button, ux-table, ux-form)  │
├─────────────────────────────────────┤
│  Layer 1: Angular Material          │
│  (mat-button, mat-table, mat-form)  │
└─────────────────────────────────────┘
```

---

## Layer 1: Foundation (Angular Material)

Basis-Komponenten direkt von Angular Material. Diese sollten in Apps **nicht direkt** verwendet werden, sondern über Layer 2 Wrapper.

### Installation

```bash
ng add @angular/material
```

### Material Module

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
```

---

## Layer 2: UX Design System Components

Wrapper-Komponenten mit enterprise branding und konsistentem Verhalten.

### Button Components

#### ux-button

Standardisierter Button mit konsistentem Styling.

```html
<!-- Primary Button -->
<ux-button color="primary" (click)="save()">
  Speichern
</ux-button>

<!-- Secondary Button -->
<ux-button color="secondary" (click)="cancel()">
  Abbrechen
</ux-button>

<!-- Button mit Icon -->
<ux-button color="primary">
  <mat-icon>add</mat-icon>
  Neuer Kunde
</ux-button>

<!-- Disabled Button -->
<ux-button [disabled]="!form.valid">
  Weiter
</ux-button>
```

**Props**:
- `color`: 'primary' | 'secondary' | 'warn'
- `disabled`: boolean
- `type`: 'button' | 'submit' | 'reset'

#### ux-icon-button

Icon-only Button für Actions.

```html
<ux-icon-button aria-label="Bearbeiten" (click)="edit()">
  <mat-icon>edit</mat-icon>
</ux-icon-button>
```

### Form Components

#### ux-form-field

Konsistentes Form Field mit Label, Error Handling und Hint.

```html
<ux-form-field>
  <mat-label>E-Mail *</mat-label>
  <input matInput type="email" [formControl]="emailControl" required>
  <mat-hint>Format: name@example.com</mat-hint>
  <mat-error *ngIf="emailControl.hasError('required')">
    E-Mail ist erforderlich
  </mat-error>
  <mat-error *ngIf="emailControl.hasError('email')">
    Bitte gültige E-Mail eingeben
  </mat-error>
</ux-form-field>
```

#### ux-select

Dropdown-Auswahl.

```html
<ux-form-field>
  <mat-label>Status</mat-label>
  <mat-select [formControl]="statusControl">
    <mat-option value="active">Aktiv</mat-option>
    <mat-option value="inactive">Inaktiv</mat-option>
    <mat-option value="pending">Ausstehend</mat-option>
  </mat-select>
</ux-form-field>
```

#### ux-date-picker

Datums-Auswahl.

```html
<ux-form-field>
  <mat-label>Geburtsdatum</mat-label>
  <input matInput [matDatepicker]="picker" [formControl]="dateControl">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</ux-form-field>
```

#### ux-checkbox

Checkbox mit konsistentem Styling.

```html
<ux-checkbox [formControl]="agreeControl">
  Ich akzeptiere die Nutzungsbedingungen
</ux-checkbox>
```

#### ux-radio-group

Radio Button Group.

```html
<mat-label>Geschlecht</mat-label>
<mat-radio-group [formControl]="genderControl">
  <mat-radio-button value="m">Männlich</mat-radio-button>
  <mat-radio-button value="f">Weiblich</mat-radio-button>
  <mat-radio-button value="o">Divers</mat-radio-button>
</mat-radio-group>
```

### Layout Components

#### ux-card

Standardisierte Card-Komponente.

```html
<ux-card>
  <ux-card-header>
    <ux-card-title>Kundendaten</ux-card-title>
  </ux-card-header>
  <ux-card-content>
    <p>Max Mustermann</p>
    <p>Musterstrasse 123</p>
  </ux-card-content>
  <ux-card-actions>
    <ux-button>Bearbeiten</ux-button>
    <ux-button color="warn">Löschen</ux-button>
  </ux-card-actions>
</ux-card>
```

#### ux-page-header

Wiederverwendbarer Seiten-Header.

```html
<ux-page-header>
  <ux-breadcrumbs>
    <a href="/">Home</a>
    <a href="/customers">Kunden</a>
    <span>Müller AG</span>
  </ux-breadcrumbs>
  
  <ux-page-title>
    <h1>Müller AG</h1>
    <ux-status-chip status="active">Aktiv</ux-status-chip>
  </ux-page-title>
  
  <ux-page-actions>
    <ux-button color="secondary">
      <mat-icon>edit</mat-icon>
      Bearbeiten
    </ux-button>
    <ux-button color="primary">
      <mat-icon>add</mat-icon>
      Neue Offerte
    </ux-button>
  </ux-page-actions>
</ux-page-header>
```

### Data Display Components

#### ux-table

Enterprise Table mit Sorting, Filtering, Pagination.

```html
<ux-table [dataSource]="dataSource">
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let row">{{row.name}}</td>
  </ng-container>
  
  <ng-container matColumnDef="status">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
    <td mat-cell *matCellDef="let row">
      <ux-status-chip [status]="row.status">
        {{row.status}}
      </ux-status-chip>
    </td>
  </ng-container>
  
  <ng-container matColumnDef="actions">
    <th mat-header-cell *matHeaderCellDef>Aktionen</th>
    <td mat-cell *matCellDef="let row">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="view(row)">
          <mat-icon>visibility</mat-icon>
          <span>Anzeigen</span>
        </button>
        <button mat-menu-item (click)="edit(row)">
          <mat-icon>edit</mat-icon>
          <span>Bearbeiten</span>
        </button>
        <button mat-menu-item (click)="delete(row)">
          <mat-icon>delete</mat-icon>
          <span>Löschen</span>
        </button>
      </mat-menu>
    </td>
  </ng-container>
  
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
      (click)="selectRow(row)"></tr>
</ux-table>

<mat-paginator [pageSizeOptions]="[10, 25, 50, 100]"></mat-paginator>
```

#### ux-status-chip

Status-Badge mit semantischer Färbung.

```html
<!-- Success -->
<ux-status-chip status="success">Aktiv</ux-status-chip>

<!-- Warning -->
<ux-status-chip status="warning">Ausstehend</ux-status-chip>

<!-- Error -->
<ux-status-chip status="error">Fehler</ux-status-chip>

<!-- Info -->
<ux-status-chip status="info">In Bearbeitung</ux-status-chip>
```

### Navigation Components

#### ux-tabs

Tab-Navigation für Detail-Seiten.

```html
<ux-tabs>
  <mat-tab label="Übersicht">
    <ng-template matTabContent>
      <!-- Tab Content -->
    </ng-template>
  </mat-tab>
  
  <mat-tab label="Verträge">
    <ng-template matTabContent>
      <!-- Tab Content -->
    </ng-template>
  </mat-tab>
  
  <mat-tab label="Schäden">
    <ng-template matTabContent>
      <!-- Tab Content -->
    </ng-template>
  </mat-tab>
</ux-tabs>
```

#### ux-stepper

Wizard/Stepper für mehrstufige Prozesse.

```html
<ux-stepper>
  <mat-step label="Kunde auswählen" [stepControl]="customerForm">
    <form [formGroup]="customerForm">
      <!-- Step 1 Content -->
    </form>
    <div>
      <button mat-button matStepperNext>Weiter</button>
    </div>
  </mat-step>
  
  <mat-step label="Produktauswahl" [stepControl]="productForm">
    <form [formGroup]="productForm">
      <!-- Step 2 Content -->
    </form>
    <div>
      <button mat-button matStepperPrevious>Zurück</button>
      <button mat-button matStepperNext>Weiter</button>
    </div>
  </mat-step>
  
  <mat-step label="Review">
    <!-- Review Content -->
    <div>
      <button mat-button matStepperPrevious>Zurück</button>
      <button mat-button (click)="submit()">Absenden</button>
    </div>
  </mat-step>
</ux-stepper>
```

### Feedback Components

#### ux-snackbar

Toast Notifications.

```typescript
// Service
constructor(private snackBar: MatSnackBar) {}

showSuccess(message: string) {
  this.snackBar.open(message, 'Schließen', {
    duration: 3000,
    panelClass: ['ux-snackbar-success']
  });
}

showError(message: string) {
  this.snackBar.open(message, 'Schließen', {
    duration: 5000,
    panelClass: ['ux-snackbar-error']
  });
}
```

```typescript
// Usage
this.snackBar.showSuccess('Kunde erfolgreich gespeichert');
this.snackBar.showError('Fehler beim Speichern');
```

#### ux-dialog

Standardisierte Dialoge.

```typescript
// Component
openDialog() {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Kunde löschen?',
      message: 'Diese Aktion kann nicht rückgängig gemacht werden.',
      confirmText: 'Löschen',
      cancelText: 'Abbrechen'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteCustomer();
    }
  });
}
```

```html
<!-- confirm-dialog.component.html -->
<h2 mat-dialog-title>{{data.title}}</h2>
<mat-dialog-content>
  <p>{{data.message}}</p>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button [mat-dialog-close]="false">
    {{data.cancelText}}
  </button>
  <button mat-button color="warn" [mat-dialog-close]="true">
    {{data.confirmText}}
  </button>
</mat-dialog-actions>
```

#### ux-progress

Loading Indicators.

```html
<!-- Spinner -->
<mat-spinner></mat-spinner>

<!-- Progress Bar (determinate) -->
<mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>

<!-- Progress Bar (indeterminate) -->
<mat-progress-bar mode="indeterminate"></mat-progress-bar>
```

---

## Layer 3: Business Components

Domänen-spezifische Komponenten für Insurance-Kontext.

### ux-customer-card

Kompakte Kunden-Ansicht.

```html
<ux-customer-card [customer]="customer">
  <ux-customer-header>
    <h3>{{customer.name}}</h3>
    <ux-status-chip [status]="customer.status">
      {{customer.status}}
    </ux-status-chip>
  </ux-customer-header>
  
  <ux-customer-details>
    <p>📧 {{customer.email}}</p>
    <p>📞 {{customer.phone}}</p>
    <p>🏠 {{customer.address}}</p>
  </ux-customer-details>
  
  <ux-customer-actions>
    <ux-button (click)="viewCustomer(customer)">Details</ux-button>
  </ux-customer-actions>
</ux-customer-card>
```

### ux-policy-header

Versicherungs-Header mit Status.

```html
<ux-policy-header [policy]="policy">
  <div class="policy-number">Police: {{policy.number}}</div>
  <div class="policy-product">{{policy.productName}}</div>
  <ux-status-chip [status]="policy.status">
    {{policy.status}}
  </ux-status-chip>
  <div class="policy-dates">
    Laufzeit: {{policy.startDate | date}} - {{policy.endDate | date}}
  </div>
</ux-policy-header>
```

### ux-claim-timeline

Schadens-Historie mit Timeline.

```html
<ux-claim-timeline [events]="claimEvents">
  <ux-timeline-item *ngFor="let event of claimEvents" [event]="event">
    <ux-timeline-icon [type]="event.type"></ux-timeline-icon>
    <ux-timeline-content>
      <h4>{{event.title}}</h4>
      <p>{{event.description}}</p>
      <small>{{event.date | date:'short'}} - {{event.user}}</small>
    </ux-timeline-content>
  </ux-timeline-item>
</ux-claim-timeline>
```

### ux-document-viewer

Dokumenten-Vorschau mit Actions.

```html
<ux-document-viewer [document]="document">
  <ux-document-header>
    <h3>{{document.name}}</h3>
    <ux-document-actions>
      <button mat-icon-button (click)="download()">
        <mat-icon>download</mat-icon>
      </button>
      <button mat-icon-button (click)="share()">
        <mat-icon>share</mat-icon>
      </button>
      <button mat-icon-button (click)="delete()">
        <mat-icon>delete</mat-icon>
      </button>
    </ux-document-actions>
  </ux-document-header>
  
  <ux-document-preview>
    <iframe [src]="document.previewUrl"></iframe>
  </ux-document-preview>
  
  <ux-document-metadata>
    <p>Typ: {{document.type}}</p>
    <p>Größe: {{document.size | fileSize}}</p>
    <p>Hochgeladen: {{document.uploadDate | date}}</p>
    <p>Von: {{document.uploadedBy}}</p>
  </ux-document-metadata>
</ux-document-viewer>
```

### ux-filter-bar

Filter-Leiste für Listen.

```html
<ux-filter-bar>
  <ux-search-field 
    placeholder="Suche..." 
    (search)="onSearch($event)">
  </ux-search-field>
  
  <ux-filter-chips>
    <mat-chip-list>
      <mat-chip *ngFor="let filter of activeFilters" 
                (removed)="removeFilter(filter)">
        {{filter.label}}
        <mat-icon matChipRemove>cancel</mat-icon>
      </mat-chip>
    </mat-chip-list>
  </ux-filter-chips>
  
  <ux-filter-actions>
    <button mat-button (click)="clearFilters()">Zurücksetzen</button>
    <button mat-button (click)="saveView()">Ansicht speichern</button>
  </ux-filter-actions>
</ux-filter-bar>
```

### ux-entity-header

Wiederverwendbarer Entity Header für Detail-Seiten.

```html
<ux-entity-header>
  <ux-entity-identity>
    <h1>{{entity.name}}</h1>
    <p class="entity-id">ID: {{entity.id}}</p>
  </ux-entity-identity>
  
  <ux-entity-status>
    <ux-status-chip [status]="entity.status">
      {{entity.status}}
    </ux-status-chip>
  </ux-entity-status>
  
  <ux-entity-actions>
    <ux-button color="secondary" (click)="edit()">
      <mat-icon>edit</mat-icon>
      Bearbeiten
    </ux-button>
    <ux-button color="warn" (click)="delete()">
      <mat-icon>delete</mat-icon>
      Löschen
    </ux-button>
  </ux-entity-actions>
</ux-entity-header>
```

---

## Utilities & Helpers

### Responsive Utilities

```typescript
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

constructor(private breakpointObserver: BreakpointObserver) {}

ngOnInit() {
  this.breakpointObserver
    .observe([Breakpoints.Handset])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
}
```

### Form Validation

```typescript
import { Validators, FormBuilder } from '@angular/forms';

customerForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  ahvNumber: ['', [Validators.required, this.ahvValidator]]
});

// Custom Validator
ahvValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  
  const pattern = /^756\.\d{4}\.\d{4}\.\d{2}$/;
  return pattern.test(value) ? null : { invalidAhv: true };
}
```

---

## Best Practices

### ✅ Do's

1. **Nutze Layer 2 Wrapper**: Nicht direkt Material verwenden
2. **Konsistentes Styling**: Design Tokens verwenden
3. **Accessibility**: ARIA Labels, Keyboard Navigation
4. **Error Handling**: Immer Fehlermeldungen mit Lösungsweg
5. **Loading States**: Skeleton > Spinner
6. **Empty States**: Mit CTA ("Ersten Kunde anlegen")

### ❌ Don'ts

1. **Keine Magic Numbers**: Immer Tokens verwenden
2. **Keine inline Styles**: SCSS mit Tokens
3. **Keine Custom Colors**: Nur aus der Palette
4. **Keine inkonsistenten Patterns**: Golden Path folgen
5. **Keine fehlenden Labels**: Screen Reader Support
6. **Keine fehlenden Loading States**: User braucht Feedback

---

## Code Examples

### Complete Form Example

```typescript
// customer-form.component.ts
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      status: ['active', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.customerForm.valid) {
      this.customerService.save(this.customerForm.value).subscribe({
        next: () => {
          this.snackBar.open('Kunde erfolgreich gespeichert', 'Schließen', {
            duration: 3000,
            panelClass: ['ux-snackbar-success']
          });
        },
        error: (error) => {
          this.snackBar.open('Fehler beim Speichern', 'Schließen', {
            duration: 5000,
            panelClass: ['ux-snackbar-error']
          });
        }
      });
    }
  }
}
```

```html
<!-- customer-form.component.html -->
<form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
  <ux-card>
    <ux-card-header>
      <ux-card-title>Kundendaten</ux-card-title>
    </ux-card-header>
    
    <ux-card-content>
      <div class="form-grid">
        <ux-form-field>
          <mat-label>Name *</mat-label>
          <input matInput formControlName="name" required>
          <mat-error>Name ist erforderlich</mat-error>
        </ux-form-field>
        
        <ux-form-field>
          <mat-label>E-Mail *</mat-label>
          <input matInput type="email" formControlName="email" required>
          <mat-error>Bitte gültige E-Mail eingeben</mat-error>
        </ux-form-field>
        
        <ux-form-field>
          <mat-label>Telefon *</mat-label>
          <input matInput formControlName="phone" required>
          <mat-error>Telefon ist erforderlich</mat-error>
        </ux-form-field>
        
        <ux-form-field>
          <mat-label>Adresse</mat-label>
          <textarea matInput formControlName="address"></textarea>
        </ux-form-field>
        
        <ux-form-field>
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="active">Aktiv</mat-option>
            <mat-option value="inactive">Inaktiv</mat-option>
          </mat-select>
        </ux-form-field>
      </div>
    </ux-card-content>
    
    <ux-card-actions>
      <ux-button type="button" color="secondary" routerLink="/customers">
        Abbrechen
      </ux-button>
      <ux-button type="submit" color="primary" [disabled]="!customerForm.valid">
        Speichern
      </ux-button>
    </ux-card-actions>
  </ux-card>
</form>
```

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: 12. Februar 2026
