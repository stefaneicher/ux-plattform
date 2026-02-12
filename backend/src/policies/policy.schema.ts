import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PolicyDocument = Policy & Document;

export enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

export enum PaymentFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  ANNUAL = 'ANNUAL'
}

@Schema({ timestamps: true })
export class Policy {
  @Prop({ required: true })
  policyNumber: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  insuranceType: string;

  @Prop({ required: true })
  coverageAmount: number;

  @Prop({ required: true })
  premium: number;

  @Prop({ required: true })
  deductible: number;

  @Prop({ type: String, enum: PolicyStatus, default: PolicyStatus.PENDING })
  status: PolicyStatus;

  @Prop({ type: String, enum: PaymentFrequency, default: PaymentFrequency.MONTHLY })
  paymentFrequency: PaymentFrequency;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  offerId?: string;

  @Prop({ type: [String], default: [] })
  beneficiaries: string[];

  @Prop({ type: Object })
  terms?: Record<string, any>;

  @Prop()
  notes?: string;
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
