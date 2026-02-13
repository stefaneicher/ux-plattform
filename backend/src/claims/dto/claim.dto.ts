import { IsString, IsNumber, IsEnum, IsOptional, IsDateString, IsArray, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClaimType } from '../claim.schema';

export class CreateClaimDto {
  @ApiProperty({
    description: 'ID der zugehörigen Police',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  policyId: string;

  @ApiProperty({
    description: 'Policennummer',
    example: 'POL-2024-001234'
  })
  @IsString()
  policyNumber: string;

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
    description: 'Art des Schadensfalls',
    enum: ClaimType,
    example: ClaimType.ACCIDENT
  })
  @IsEnum(ClaimType)
  claimType: ClaimType;

  @ApiProperty({
    description: 'Schadenshöhe in CHF',
    example: 5000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  claimAmount: number;

  @ApiProperty({
    description: 'Datum des Vorfalls (ISO 8601)',
    example: '2024-01-15T10:30:00Z'
  })
  @IsDateString()
  incidentDate: string;

  @ApiProperty({
    description: 'Beschreibung des Schadensfalls',
    example: 'Autounfall auf der Autobahn A1, Kollision mit anderem Fahrzeug'
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Liste der Dokument-URLs',
    type: [String],
    example: ['https://storage.example.com/claims/doc1.pdf']
  })
  @IsOptional()
  @IsArray()
  documents?: string[];
}

export class ReviewClaimDto {
  @ApiProperty({
    description: 'Entscheidung über den Schadensfall',
    enum: ['APPROVED', 'REJECTED'],
    example: 'APPROVED'
  })
  @IsEnum(['APPROVED', 'REJECTED'])
  decision: 'APPROVED' | 'REJECTED';

  @ApiPropertyOptional({
    description: 'Genehmigte Schadenshöhe in CHF',
    example: 4500,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  approvedAmount?: number;

  @ApiPropertyOptional({
    description: 'Notizen zur Prüfung',
    example: 'Alle Dokumente vollständig, Schaden wurde verifiziert'
  })
  @IsOptional()
  @IsString()
  reviewNotes?: string;

  @ApiPropertyOptional({
    description: 'Grund für Ablehnung',
    example: 'Schadensfall nicht durch Police abgedeckt'
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
