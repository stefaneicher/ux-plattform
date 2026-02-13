import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ClaimsService } from './claims.service';
import { CreateClaimDto, ReviewClaimDto } from './dto/claim.dto';
import { Claim, ClaimStatus } from './claim.schema';

@ApiTags('claims')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @ApiOperation({
    summary: 'Neuen Schadensfall erstellen',
    description: 'Erstellt einen neuen Schadensfall für eine bestehende Versicherungspolice'
  })
  @ApiResponse({ status: 201, description: 'Schadensfall erfolgreich erstellt' })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabedaten' })
  @ApiBody({ type: CreateClaimDto })
  create(@Body() createClaimDto: CreateClaimDto): Observable<Claim> {
    return this.claimsService.create(createClaimDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Alle Schadensfälle abrufen',
    description: 'Ruft alle Schadensfälle ab oder filtert nach Police oder Kunde'
  })
  @ApiQuery({ name: 'policyId', required: false, description: 'Filtert nach Police-ID' })
  @ApiQuery({ name: 'customerId', required: false, description: 'Filtert nach Kunden-ID' })
  @ApiResponse({ status: 200, description: 'Liste der Schadensfälle' })
  findAll(
    @Query('policyId') policyId?: string,
    @Query('customerId') customerId?: string
  ): Observable<Claim[]> {
    if (policyId) {
      return this.claimsService.findByPolicy(policyId);
    }
    if (customerId) {
      return this.claimsService.findByCustomer(customerId);
    }
    return this.claimsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Schadensfall nach ID abrufen',
    description: 'Ruft einen einzelnen Schadensfall anhand seiner ID ab'
  })
  @ApiParam({ name: 'id', description: 'Schadensfall-ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Schadensfall gefunden' })
  @ApiResponse({ status: 404, description: 'Schadensfall nicht gefunden' })
  findOne(@Param('id') id: string): Observable<Claim> {
    return this.claimsService.findOne(id);
  }

  @Get('number/:claimNumber')
  @ApiOperation({
    summary: 'Schadensfall nach Nummer abrufen',
    description: 'Ruft einen Schadensfall anhand seiner Schadensnummer ab'
  })
  @ApiParam({ name: 'claimNumber', description: 'Schadensnummer (z.B. CLM-2024-001234)' })
  @ApiResponse({ status: 200, description: 'Schadensfall gefunden' })
  @ApiResponse({ status: 404, description: 'Schadensfall nicht gefunden' })
  findByClaimNumber(@Param('claimNumber') claimNumber: string): Observable<Claim> {
    return this.claimsService.findByClaimNumber(claimNumber);
  }

  @Post(':id/review/start')
  @ApiOperation({
    summary: 'Schadensfall-Prüfung starten',
    description: 'Startet den Prüfungsprozess für einen Schadensfall'
  })
  @ApiParam({ name: 'id', description: 'Schadensfall-ID' })
  @ApiResponse({ status: 200, description: 'Prüfung gestartet' })
  @ApiResponse({ status: 404, description: 'Schadensfall nicht gefunden' })
  startReview(@Param('id') id: string): Observable<Claim> {
    return this.claimsService.startReview(id);
  }

  @Post(':id/review')
  @ApiOperation({
    summary: 'Schadensfall prüfen und genehmigen/ablehnen',
    description: 'Entscheidet über die Genehmigung oder Ablehnung eines Schadensfalls'
  })
  @ApiParam({ name: 'id', description: 'Schadensfall-ID' })
  @ApiBody({ type: ReviewClaimDto })
  @ApiResponse({ status: 200, description: 'Schadensfall geprüft' })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabedaten' })
  @ApiResponse({ status: 404, description: 'Schadensfall nicht gefunden' })
  review(
    @Param('id') id: string,
    @Body() reviewDto: ReviewClaimDto
  ): Observable<Claim> {
    return this.claimsService.review(id, reviewDto);
  }

  @Post(':id/pay')
  @ApiOperation({
    summary: 'Schadensfall als bezahlt markieren',
    description: 'Markiert einen genehmigten Schadensfall als bezahlt'
  })
  @ApiParam({ name: 'id', description: 'Schadensfall-ID' })
  @ApiResponse({ status: 200, description: 'Schadensfall als bezahlt markiert' })
  @ApiResponse({ status: 404, description: 'Schadensfall nicht gefunden' })
  markAsPaid(@Param('id') id: string): Observable<Claim> {
    return this.claimsService.markAsPaid(id);
  }

  @Get('policy/:policyId/billing')
  @ApiOperation({
    summary: 'Abrechnung für Police berechnen',
    description: 'Berechnet die Gesamtabrechnung aller Schadensfälle einer Police'
  })
  @ApiParam({ name: 'policyId', description: 'Police-ID' })
  @ApiResponse({ status: 200, description: 'Abrechnung berechnet' })
  calculateBilling(@Param('policyId') policyId: string): Observable<{ total: number; count: number }> {
    return this.claimsService.calculateBilling(policyId);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Status eines Schadensfalls aktualisieren',
    description: 'Ändert den Status eines Schadensfalls'
  })
  @ApiParam({ name: 'id', description: 'Schadensfall-ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(ClaimStatus),
          description: 'Neuer Status'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Status aktualisiert' })
  @ApiResponse({ status: 404, description: 'Schadensfall nicht gefunden' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: ClaimStatus
  ): Observable<Claim> {
    return this.claimsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Schadensfall löschen',
    description: 'Löscht einen Schadensfall permanent'
  })
  @ApiParam({ name: 'id', description: 'Schadensfall-ID' })
  @ApiResponse({ status: 200, description: 'Schadensfall gelöscht' })
  @ApiResponse({ status: 404, description: 'Schadensfall nicht gefunden' })
  remove(@Param('id') id: string): Observable<any> {
    return this.claimsService.remove(id);
  }
}
