import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { InsuranceType } from '../offer.schema';

export class CreateOfferDto {
  @IsString()
  customerId: string;

  @IsString()
  customerName: string;

  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @IsNumber()
  @Min(0)
  coverageAmount: number;

  @IsNumber()
  @Min(0)
  deductible: number;

  @IsOptional()
  additionalData?: Record<string, any>;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CalculateOfferDto {
  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @IsNumber()
  @Min(0)
  coverageAmount: number;

  @IsNumber()
  @Min(0)
  deductible: number;

  @IsOptional()
  customerAge?: number;

  @IsOptional()
  riskFactors?: Record<string, any>;
}
