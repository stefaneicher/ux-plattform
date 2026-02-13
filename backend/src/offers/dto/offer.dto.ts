import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InsuranceType } from '../offer.schema';

export class CreateOfferDto {
  @ApiProperty({
    description: 'ID des Kunden',
    example: '507f1f77bcf86cd799439012'
  })
  @IsString()
  customerId: string;

  @ApiProperty({
    description: 'Name des Kunden',
    example: 'Max Mustermann'
  })
  @IsString()
  customerName: string;

  @ApiProperty({
    description: 'Art der Versicherung',
    enum: InsuranceType,
    example: InsuranceType.PROPERTY
  })
  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @ApiProperty({
    description: 'Gewünschte Deckungssumme in CHF',
    example: 100000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  coverageAmount: number;

  @ApiProperty({
    description: 'Gewünschter Selbstbehalt in CHF',
    example: 500,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  deductible: number;

  @ApiPropertyOptional({
    description: 'Zusätzliche Daten zur Risikoberechnung',
    example: { propertyValue: 500000, location: 'Zürich' }
  })
  @IsOptional()
  additionalData?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Notizen zum Angebot',
    example: 'Kunde interessiert sich auch für Zusatzversicherungen'
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CalculateOfferDto {
  @ApiProperty({
    description: 'Art der Versicherung',
    enum: InsuranceType,
    example: InsuranceType.VEHICLE
  })
  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @ApiProperty({
    description: 'Gewünschte Deckungssumme in CHF',
    example: 50000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  coverageAmount: number;

  @ApiProperty({
    description: 'Gewünschter Selbstbehalt in CHF',
    example: 1000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  deductible: number;

  @ApiPropertyOptional({
    description: 'Alter des Kunden',
    example: 35
  })
  @IsOptional()
  customerAge?: number;

  @ApiPropertyOptional({
    description: 'Risikofaktoren für Prämienkalkulation',
    example: { accidents: 0, claims: 1, drivingYears: 15 }
  })
  @IsOptional()
  riskFactors?: Record<string, any>;
}
