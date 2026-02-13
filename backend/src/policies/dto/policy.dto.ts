import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentFrequency } from '../policy.schema';

export class CreatePolicyDto {
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
    example: 'Hausratversicherung'
  })
  @IsString()
  insuranceType: string;

  @ApiProperty({
    description: 'Deckungssumme in CHF',
    example: 100000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  coverageAmount: number;

  @ApiProperty({
    description: 'Prämie in CHF',
    example: 250,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  premium: number;

  @ApiProperty({
    description: 'Selbstbehalt in CHF',
    example: 500,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  deductible: number;

  @ApiProperty({
    description: 'Zahlungsfrequenz',
    enum: PaymentFrequency,
    example: PaymentFrequency.MONTHLY
  })
  @IsEnum(PaymentFrequency)
  paymentFrequency: PaymentFrequency;

  @ApiProperty({
    description: 'Startdatum der Police (ISO 8601)',
    example: '2024-01-01T00:00:00Z'
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Enddatum der Police (ISO 8601)',
    example: '2025-01-01T00:00:00Z'
  })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({
    description: 'ID des zugehörigen Angebots',
    example: '507f1f77bcf86cd799439013'
  })
  @IsOptional()
  @IsString()
  offerId?: string;

  @ApiPropertyOptional({
    description: 'Liste der Begünstigten',
    type: [String],
    example: ['Maria Mustermann', 'Tom Mustermann']
  })
  @IsOptional()
  @IsArray()
  beneficiaries?: string[];

  @ApiPropertyOptional({
    description: 'Zusätzliche Vertragsbedingungen',
    example: { clause1: 'value1', clause2: 'value2' }
  })
  @IsOptional()
  terms?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Notizen zur Police',
    example: 'Kunde wünscht vierteljährliche Zahlung'
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
