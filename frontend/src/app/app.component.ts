import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSS Insurance Demo';
  
  menuItems = [
    { path: '/offers', icon: 'description', label: 'Offerten' },
    { path: '/policies', icon: 'policy', label: 'Policen' },
    { path: '/claims', icon: 'assignment', label: 'Leistungen' },
  ];
}
