# Insurance Demo Application - Documentation

## Overview

This is a full-stack insurance demo application built with Domain-Driven Design (DDD) principles, featuring three bounded contexts for managing the insurance business process.

## Architecture

### Technology Stack

**Frontend:**
- Angular 17
- Angular Material (UI Components)
- RxJS (Reactive Programming)
- TypeScript

**Backend:**
- NestJS (Node.js Framework)
- MongoDB with Mongoose (Database)
- RxJS (Reactive REST API)
- Bull & Redis (Job Queue for background processing)
- TypeScript

### Design Principles

1. **Domain-Driven Design (DDD)**: The application is organized around three bounded contexts
2. **Reactive Programming**: Uses RxJS for handling async operations and backpressure
3. **Separation of Concerns**: Clear separation between frontend and backend
4. **REST API**: Follows REST principles for API design
5. **Type Safety**: Full TypeScript implementation across frontend and backend

## Bounded Contexts

### 1. Offers Context (Offerten)

**Purpose**: Handle insurance offer calculations and management

**Domain Model:**
- `Offer` aggregate
- Calculate premiums based on risk factors
- Manage offer lifecycle (DRAFT → CALCULATED → SENT → ACCEPTED/REJECTED/EXPIRED)

**Key Features:**
- Premium calculation engine
- Risk factor assessment
- Offer validity management (30 days default)

**API Endpoints:**
```
POST   /api/offers/calculate      - Calculate premium
POST   /api/offers                - Create offer
GET    /api/offers                - List all offers
GET    /api/offers/:id            - Get offer details
POST   /api/offers/:id/calculate  - Calculate for existing offer
PATCH  /api/offers/:id/status     - Update offer status
DELETE /api/offers/:id            - Delete offer
```

### 2. Policies Context (Policen)

**Purpose**: Manage insurance policies and their lifecycle

**Domain Model:**
- `Policy` aggregate
- Policy number generation (auto-generated unique ID)
- Payment frequency management
- Policy lifecycle management (PENDING → ACTIVE → SUSPENDED/CANCELLED/EXPIRED)

**Key Features:**
- Policy creation from offers
- Beneficiary management
- Payment schedule tracking
- Policy activation and cancellation

**API Endpoints:**
```
POST   /api/policies                    - Create policy
GET    /api/policies                    - List all policies
GET    /api/policies?customerId=xxx     - Filter by customer
GET    /api/policies/:id                - Get policy details
GET    /api/policies/number/:number     - Get by policy number
POST   /api/policies/:id/activate       - Activate policy
PATCH  /api/policies/:id/status         - Update status
POST   /api/policies/:id/cancel         - Cancel policy
DELETE /api/policies/:id                - Delete policy
```

### 3. Claims Context (Leistungen)

**Purpose**: Process insurance claims and handle billing

**Domain Model:**
- `Claim` aggregate
- Claim number generation (auto-generated unique ID)
- Review workflow
- Payment processing

**Key Features:**
- Claim submission
- Review workflow (SUBMITTED → UNDER_REVIEW → APPROVED/REJECTED → PAID)
- Amount approval process
- Billing calculation per policy

**API Endpoints:**
```
POST   /api/claims                       - Submit claim
GET    /api/claims                       - List all claims
GET    /api/claims?policyId=xxx          - Filter by policy
GET    /api/claims?customerId=xxx        - Filter by customer
GET    /api/claims/:id                   - Get claim details
GET    /api/claims/number/:number        - Get by claim number
POST   /api/claims/:id/review/start      - Start review
POST   /api/claims/:id/review            - Approve/reject claim
POST   /api/claims/:id/pay               - Mark as paid
GET    /api/claims/policy/:id/billing    - Calculate billing
PATCH  /api/claims/:id/status            - Update status
DELETE /api/claims/:id                   - Delete claim
```

## Business Process

### Complete Insurance Flow

```
1. Offer Creation & Calculation
   ↓
2. Offer Acceptance
   ↓
3. Policy Creation
   ↓
4. Policy Activation
   ↓
5. Claim Submission (when needed)
   ↓
6. Claim Review & Approval
   ↓
7. Payment Processing
   ↓
8. Billing & Settlement
```

### Detailed Process Steps

#### 1. Offer Creation Process
1. Customer provides insurance requirements
2. System calculates premium based on:
   - Coverage amount
   - Deductible
   - Insurance type
   - Risk factors (age, type-specific factors)
3. Offer is created with DRAFT status
4. After calculation, status changes to CALCULATED
5. Offer is sent to customer (SENT status)
6. Customer accepts (ACCEPTED) or rejects (REJECTED)
7. Offers expire after 30 days if not accepted

#### 2. Policy Creation Process
1. Accepted offer is used to create policy
2. System generates unique policy number
3. Policy starts with PENDING status
4. Admin activates policy (ACTIVE status)
5. Policy runs for the specified duration
6. Policy can be SUSPENDED or CANCELLED
7. Policy automatically EXPIRES at end date

#### 3. Claim Processing
1. Customer submits claim for active policy
2. System generates unique claim number
3. Claim starts with SUBMITTED status
4. Admin starts review (UNDER_REVIEW status)
5. Admin approves with amount or rejects
6. If approved, claim moves to APPROVED status
7. Payment is processed (PAID status)
8. Claim is closed (CLOSED status)

## Database Schema

### Offers Collection
```javascript
{
  _id: ObjectId,
  customerId: String,
  customerName: String,
  insuranceType: String, // HEALTH, LIFE, PROPERTY, VEHICLE, LIABILITY
  coverageAmount: Number,
  deductible: Number,
  calculatedPremium: Number,
  riskFactor: Number,
  status: String, // DRAFT, CALCULATED, SENT, ACCEPTED, REJECTED, EXPIRED
  validUntil: Date,
  additionalData: Object,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Policies Collection
```javascript
{
  _id: ObjectId,
  policyNumber: String, // Auto-generated: POL-{timestamp}-{random}
  customerId: String,
  customerName: String,
  insuranceType: String,
  coverageAmount: Number,
  premium: Number,
  deductible: Number,
  status: String, // PENDING, ACTIVE, SUSPENDED, CANCELLED, EXPIRED
  paymentFrequency: String, // MONTHLY, QUARTERLY, SEMI_ANNUAL, ANNUAL
  startDate: Date,
  endDate: Date,
  offerId: String, // Reference to original offer
  beneficiaries: [String],
  terms: Object,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Claims Collection
```javascript
{
  _id: ObjectId,
  claimNumber: String, // Auto-generated: CLM-{timestamp}-{random}
  policyId: String,
  policyNumber: String,
  customerId: String,
  customerName: String,
  claimType: String, // MEDICAL, ACCIDENT, PROPERTY_DAMAGE, LIABILITY, OTHER
  claimAmount: Number,
  approvedAmount: Number,
  status: String, // SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, PAID, CLOSED
  incidentDate: Date,
  description: String,
  documents: [String],
  reviewNotes: String,
  paymentDate: Date,
  rejectionReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Reactive Programming & Scalability

### RxJS Implementation

The backend uses RxJS throughout for reactive programming:

1. **Observable Responses**: All service methods return Observables
2. **Backpressure Handling**: RxJS operators manage data flow
3. **Error Handling**: Centralized error handling with retry logic
4. **Stream Composition**: Complex operations composed from simple streams

### Job Queue Management

Bull queue (Redis-based) handles:
- Premium calculations for large batches
- Policy renewal notifications
- Claim processing workflows
- Report generation
- Email notifications

### Scalability Features

1. **Stateless API**: No session state, easy horizontal scaling
2. **Database Indexing**: Indexed on frequently queried fields
3. **Connection Pooling**: MongoDB connection pool for efficiency
4. **Async Processing**: Heavy operations moved to job queue
5. **Reactive Streams**: Natural backpressure handling

## Frontend Architecture

### Component Structure

```
app/
├── offers/
│   ├── offers-list/      - Display all offers
│   ├── offers-form/      - Create/edit offers
│   ├── offers.service.ts - Offer API calls
│   └── offers.module.ts  - Feature module
├── policies/
│   ├── policies-list/    - Display all policies
│   ├── policies-form/    - Create/edit policies
│   ├── policies.service.ts
│   └── policies.module.ts
├── claims/
│   ├── claims-list/      - Display all claims
│   ├── claims-form/      - Create/edit claims
│   ├── claims.service.ts
│   └── claims.module.ts
└── app.component.ts      - Main shell with navigation
```

### Routing

```
/offers          - Offers list
/offers/new      - Create new offer
/policies        - Policies list
/policies/new    - Create new policy
/claims          - Claims list
/claims/new      - Submit new claim
```

### State Management

- Component-level state using RxJS BehaviorSubjects
- HTTP calls through services
- Real-time updates via Observable streams

## Development Setup

### Prerequisites

```bash
# Required
Node.js 18+
MongoDB 4.4+
Redis 6+ (optional, for job queue)

# Optional
Docker (for containerized MongoDB/Redis)
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run start:dev
```

Backend runs on: `http://localhost:3000`
API endpoints: `http://localhost:3000/api`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:4200`

### Docker Compose (Optional)

```bash
# Start MongoDB and Redis
docker-compose up -d
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment
- Build: `npm run build`
- Start: `npm start`
- Environment: Set production environment variables
- Database: Point to production MongoDB
- Redis: Configure production Redis instance

### Frontend Deployment
- Build: `npm run build`
- Output: `dist/` folder
- Serve via: Nginx, Apache, or any static file server
- API Proxy: Configure reverse proxy to backend

## Security Considerations

1. **Input Validation**: All inputs validated with class-validator
2. **CORS**: Configured for specific origins
3. **MongoDB**: Use connection strings with authentication
4. **Environment Variables**: Never commit .env files
5. **HTTPS**: Use HTTPS in production
6. **Rate Limiting**: Implement API rate limiting
7. **Authentication**: Add JWT or OAuth2 for production

## Monitoring & Logging

Recommended additions for production:
- Winston or Bunyan for structured logging
- PM2 for process management
- Prometheus + Grafana for metrics
- Sentry for error tracking
- ELK Stack for log aggregation

## Future Enhancements

1. **Authentication & Authorization**
   - User login system
   - Role-based access control (Customer, Agent, Admin)

2. **Advanced Features**
   - Document upload for claims
   - Email notifications
   - PDF report generation
   - Payment gateway integration

3. **Business Intelligence**
   - Analytics dashboard
   - Risk assessment ML models
   - Fraud detection

4. **Integrations**
   - Third-party insurance providers
   - Credit scoring APIs
   - Identity verification services

## Support

For questions or issues:
- Backend: See `backend/README.md`
- Frontend: See `frontend/README.md`
- General: See main `README.md`
