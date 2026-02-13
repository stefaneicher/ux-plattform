# Insurance Platform Backend

NestJS backend for the Insurance demo application with Domain-Driven Design (DDD) architecture.

## 📚 API Documentation

**Interactive API Documentation with Swagger/OpenAPI is available!**

After starting the backend, open:
- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs-json

For detailed information, see [OPENAPI_GUIDE.md](./OPENAPI_GUIDE.md)

## Architecture

This backend implements three bounded contexts:

### 1. Offers Context (Offerten)
- Calculate insurance premiums
- Create and manage offers
- Premium calculation based on risk factors

### 2. Policies Context (Policen)
- Create insurance policies from offers
- Manage policy lifecycle (active, suspended, cancelled)
- Track policy details and beneficiaries

### 3. Claims Context (Leistungen/Claims)
- Submit and track claims
- Review and approve/reject claims
- Process payments
- Calculate billing

## Technology Stack

- **Framework**: NestJS (TypeScript)
- **Database**: MongoDB with Mongoose
- **Reactive Programming**: RxJS for reactive REST API
- **Job Queue**: Bull (Redis-based)
- **Validation**: class-validator, class-transformer

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB running on localhost:27017
- Redis running on localhost:6379 (optional, for job queue)

### Installation

```bash
cd backend
npm install
```

### Configuration

Copy `.env.example` to `.env` and adjust settings:

```bash
cp .env.example .env
```

### Running

```bash
# Development mode
npm run start:dev

# Build
npm run build

# Production mode
npm start
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Offers API

- `POST /api/offers/calculate` - Calculate premium without creating offer
- `POST /api/offers` - Create new offer
- `GET /api/offers` - Get all offers
- `GET /api/offers/:id` - Get offer by ID
- `POST /api/offers/:id/calculate` - Calculate premium for existing offer
- `PATCH /api/offers/:id/status` - Update offer status
- `DELETE /api/offers/:id` - Delete offer

### Policies API

- `POST /api/policies` - Create new policy
- `GET /api/policies` - Get all policies
- `GET /api/policies?customerId=xxx` - Get policies by customer
- `GET /api/policies/:id` - Get policy by ID
- `GET /api/policies/number/:policyNumber` - Get policy by number
- `POST /api/policies/:id/activate` - Activate policy
- `PATCH /api/policies/:id/status` - Update policy status
- `POST /api/policies/:id/cancel` - Cancel policy
- `DELETE /api/policies/:id` - Delete policy

### Claims API

- `POST /api/claims` - Create new claim
- `GET /api/claims` - Get all claims
- `GET /api/claims?policyId=xxx` - Get claims by policy
- `GET /api/claims?customerId=xxx` - Get claims by customer
- `GET /api/claims/:id` - Get claim by ID
- `GET /api/claims/number/:claimNumber` - Get claim by number
- `POST /api/claims/:id/review/start` - Start claim review
- `POST /api/claims/:id/review` - Review (approve/reject) claim
- `POST /api/claims/:id/pay` - Mark claim as paid
- `GET /api/claims/policy/:policyId/billing` - Calculate billing
- `PATCH /api/claims/:id/status` - Update claim status
- `DELETE /api/claims/:id` - Delete claim

## Domain Models

### Offer
- Customer information
- Insurance type (HEALTH, LIFE, PROPERTY, VEHICLE, LIABILITY)
- Coverage amount and deductible
- Calculated premium and risk factor
- Status (DRAFT, CALCULATED, SENT, ACCEPTED, REJECTED, EXPIRED)

### Policy
- Policy number (auto-generated)
- Customer and coverage details
- Premium and payment frequency
- Status (ACTIVE, PENDING, SUSPENDED, CANCELLED, EXPIRED)
- Start and end dates
- Beneficiaries

### Claim
- Claim number (auto-generated)
- Policy reference
- Claim type (MEDICAL, ACCIDENT, PROPERTY_DAMAGE, LIABILITY, OTHER)
- Claim and approved amounts
- Status (SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, PAID, CLOSED)
- Incident date and description

## Testing

```bash
npm test
```

## Project Structure

```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── offers/                 # Offers bounded context
│   │   ├── offer.schema.ts     # Domain model
│   │   ├── offers.service.ts   # Business logic
│   │   ├── offers.controller.ts # REST endpoints
│   │   ├── offers.module.ts    # Module definition
│   │   └── dto/                # Data transfer objects
│   ├── policies/               # Policies bounded context
│   │   ├── policy.schema.ts
│   │   ├── policies.service.ts
│   │   ├── policies.controller.ts
│   │   ├── policies.module.ts
│   │   └── dto/
│   └── claims/                 # Claims bounded context
│       ├── claim.schema.ts
│       ├── claims.service.ts
│       ├── claims.controller.ts
│       ├── claims.module.ts
│       └── dto/
├── package.json
├── tsconfig.json
└── .env.example
```

## License

MIT
