import { IsString, IsNumber, IsEnum, IsOptional, IsDateString, IsArray, Min } from 'class-validator';
import { ClaimType } from '../claim.schema';

export class CreateClaimDto {
  @IsString()
  policyId: string;

  @IsString()
  policyNumber: string;

  @IsString()
  customerId: string;

  @IsString()
  customerName: string;

  @IsEnum(ClaimType)
  claimType: ClaimType;

  @IsNumber()
  @Min(0)
  claimAmount: number;

  @IsDateString()
  incidentDate: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  documents?: string[];
}

export class ReviewClaimDto {
  @IsEnum(['APPROVED', 'REJECTED'])
  decision: 'APPROVED' | 'REJECTED';

  @IsOptional()
  @IsNumber()
  @Min(0)
  approvedAmount?: number;

  @IsOptional()
  @IsString()
  reviewNotes?: string;

  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
