import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaimDocument = Claim & Document;

export enum ClaimStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
  CLOSED = 'CLOSED'
}

export enum ClaimType {
  MEDICAL = 'MEDICAL',
  ACCIDENT = 'ACCIDENT',
  PROPERTY_DAMAGE = 'PROPERTY_DAMAGE',
  LIABILITY = 'LIABILITY',
  OTHER = 'OTHER'
}

@Schema({ timestamps: true })
export class Claim {
  @Prop({ required: true })
  claimNumber: string;

  @Prop({ required: true })
  policyId: string;

  @Prop({ required: true })
  policyNumber: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true, enum: ClaimType })
  claimType: ClaimType;

  @Prop({ required: true })
  claimAmount: number;

  @Prop()
  approvedAmount?: number;

  @Prop({ type: String, enum: ClaimStatus, default: ClaimStatus.SUBMITTED })
  status: ClaimStatus;

  @Prop({ required: true })
  incidentDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  documents: string[];

  @Prop()
  reviewNotes?: string;

  @Prop()
  paymentDate?: Date;

  @Prop()
  rejectionReason?: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
