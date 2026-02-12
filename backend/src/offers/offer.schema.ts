import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

export enum OfferStatus {
  DRAFT = 'DRAFT',
  CALCULATED = 'CALCULATED',
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}

export enum InsuranceType {
  HEALTH = 'HEALTH',
  LIFE = 'LIFE',
  PROPERTY = 'PROPERTY',
  VEHICLE = 'VEHICLE',
  LIABILITY = 'LIABILITY'
}

@Schema({ timestamps: true })
export class Offer {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true, enum: InsuranceType })
  insuranceType: InsuranceType;

  @Prop({ required: true })
  coverageAmount: number;

  @Prop({ required: true })
  deductible: number;

  @Prop()
  calculatedPremium?: number;

  @Prop()
  riskFactor?: number;

  @Prop({ type: String, enum: OfferStatus, default: OfferStatus.DRAFT })
  status: OfferStatus;

  @Prop()
  validUntil?: Date;

  @Prop({ type: Object })
  additionalData?: Record<string, any>;

  @Prop()
  notes?: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
