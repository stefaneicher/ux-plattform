import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsDateString, Min } from 'class-validator';
import { PaymentFrequency } from '../policy.schema';

export class CreatePolicyDto {
  @IsString()
  customerId: string;

  @IsString()
  customerName: string;

  @IsString()
  insuranceType: string;

  @IsNumber()
  @Min(0)
  coverageAmount: number;

  @IsNumber()
  @Min(0)
  premium: number;

  @IsNumber()
  @Min(0)
  deductible: number;

  @IsEnum(PaymentFrequency)
  paymentFrequency: PaymentFrequency;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  offerId?: string;

  @IsOptional()
  @IsArray()
  beneficiaries?: string[];

  @IsOptional()
  terms?: Record<string, any>;

  @IsOptional()
  @IsString()
  notes?: string;
}
