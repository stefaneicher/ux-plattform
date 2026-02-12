import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  
  title = 'CSS Insurance Demo';
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = true;
  private destroy$ = new Subject<void>();
  
  menuItems = [
    { path: '/offers', icon: 'description', label: 'Offerten' },
    { path: '/policies', icon: 'policy', label: 'Policen' },
    { path: '/claims', icon: 'assignment', label: 'Leistungen' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Observe screen size changes
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.matches) {
          // Mobile (XSmall <600px): use overlay mode and close by default
          this.sidenavMode = 'over';
          this.sidenavOpened = false;
        } else {
          // Tablet and Desktop (>=600px): use side mode and open by default
          this.sidenavMode = 'side';
          this.sidenavOpened = true;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  onNavItemClick() {
    // Close sidenav on mobile after navigation
    if (this.sidenavMode === 'over' && this.sidenav) {
      this.sidenav.close();
    }
  }
}
