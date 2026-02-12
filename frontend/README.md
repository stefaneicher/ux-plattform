# CSS Insurance Frontend

Angular-based frontend application for the CSS Insurance demo.

## Features

- **Offers Management**: Create and calculate insurance offers
- **Policies Management**: Create and manage insurance policies
- **Claims Management**: Submit and track insurance claims
- **Responsive Design**: Works on desktop and mobile
- **Material Design**: Built with Angular Material components

## Technology Stack

- Angular 17
- Angular Material
- RxJS
- TypeScript
- Proxy configuration for backend API

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The development server is configured with a proxy to forward API calls to `http://localhost:3000/api`.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Application Structure

```
src/
├── app/
│   ├── offers/              # Offers feature module
│   │   ├── offers-list/     # List component
│   │   ├── offers-form/     # Create/edit form
│   │   ├── offers.service.ts
│   │   └── offers.module.ts
│   ├── policies/            # Policies feature module
│   │   ├── policies-list/
│   │   ├── policies-form/
│   │   ├── policies.service.ts
│   │   └── policies.module.ts
│   ├── claims/              # Claims feature module
│   │   ├── claims-list/
│   │   ├── claims-form/
│   │   ├── claims.service.ts
│   │   └── claims.module.ts
│   ├── app.component.ts     # Root component
│   ├── app.module.ts        # Root module
│   └── app-routing.module.ts # Routing configuration
├── environments/
│   ├── environment.ts       # Development environment
│   └── environment.prod.ts  # Production environment
├── assets/                  # Static assets
├── index.html               # Main HTML file
├── main.ts                  # Application entry point
└── styles.css               # Global styles
```

## Features Detail

### Offers Module

**Components:**
- `OffersListComponent`: Display all offers in a table
- `OffersFormComponent`: Create new offers with premium calculation

**Features:**
- Real-time premium calculation
- Insurance type selection (Health, Life, Property, Vehicle, Liability)
- Coverage amount and deductible configuration
- Status tracking (Draft, Calculated, Sent, Accepted, Rejected, Expired)

**Routes:**
- `/offers` - List all offers
- `/offers/new` - Create new offer

### Policies Module

**Components:**
- `PoliciesListComponent`: Display all policies
- `PoliciesFormComponent`: Create new policies

**Features:**
- Policy creation from offers
- Auto-generated policy numbers
- Payment frequency selection
- Beneficiary management
- Policy activation workflow
- Status tracking (Pending, Active, Suspended, Cancelled, Expired)

**Routes:**
- `/policies` - List all policies
- `/policies/new` - Create new policy

### Claims Module

**Components:**
- `ClaimsListComponent`: Display all claims
- `ClaimsFormComponent`: Submit new claims

**Features:**
- Claim submission linked to policies
- Auto-generated claim numbers
- Claim type classification
- Document attachment support
- Review workflow
- Payment tracking
- Status tracking (Submitted, Under Review, Approved, Rejected, Paid, Closed)

**Routes:**
- `/claims` - List all claims
- `/claims/new` - Submit new claim

## API Integration

All modules communicate with the backend via HTTP services using RxJS Observables.

**API Configuration:**
- Development: `http://localhost:3000/api` (via proxy)
- Production: Configured in `environment.prod.ts`

**Service Pattern:**
```typescript
@Injectable({ providedIn: 'root' })
export class OffersService {
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${apiUrl}/offers`);
  }
}
```

## Styling

The application uses:
- Angular Material theme (Indigo-Pink)
- Roboto font
- Material Icons
- Custom CSS for layout and spacing

Global styles are defined in `src/styles.css`.

## Navigation

The application features:
- **Top Bar**: Application title, notifications, user profile
- **Side Navigation**: Module navigation (Offers, Policies, Claims)
- **Main Content Area**: Dynamic content based on route

## Responsive Design

The application is responsive and adapts to different screen sizes:
- Desktop: Full layout with side navigation
- Tablet: Collapsible side navigation
- Mobile: Bottom navigation (future enhancement)

## Testing

```bash
npm test
```

Tests are configured but currently return placeholder results.

## Deployment

### Static Hosting

Build the application:
```bash
npm run build -- --configuration production
```

Deploy the `dist/` folder to:
- Nginx
- Apache
- AWS S3 + CloudFront
- Azure Static Web Apps
- Netlify
- Vercel

### API Configuration

Update `src/environments/environment.prod.ts` with production API URL:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourserver.com/api'
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] User authentication
- [ ] Role-based access control
- [ ] Advanced filtering and search
- [ ] Export to PDF
- [ ] Real-time notifications
- [ ] Dark mode
- [ ] Offline support with PWA
- [ ] Multi-language support (i18n)

## License

MIT
