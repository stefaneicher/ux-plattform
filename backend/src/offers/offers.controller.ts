import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { OffersService } from './offers.service';
import { CreateOfferDto, CalculateOfferDto } from './dto/offer.dto';
import { Offer, OfferStatus } from './offer.schema';

@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Prämie berechnen',
    description: 'Berechnet die Versicherungsprämie ohne ein Angebot zu erstellen'
  })
  @ApiResponse({
    status: 200,
    description: 'Prämie erfolgreich berechnet',
    schema: {
      type: 'object',
      properties: {
        premium: { type: 'number', description: 'Berechnete Prämie in CHF' },
        riskFactor: { type: 'number', description: 'Risikofaktor (0-1)' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabedaten' })
  @ApiBody({ type: CalculateOfferDto })
  calculate(@Body() calculateOfferDto: CalculateOfferDto): Observable<{ premium: number; riskFactor: number }> {
    return this.offersService.calculatePremium(calculateOfferDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Neues Angebot erstellen',
    description: 'Erstellt ein neues Versicherungsangebot für einen Kunden'
  })
  @ApiResponse({ status: 201, description: 'Angebot erfolgreich erstellt' })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabedaten' })
  @ApiBody({ type: CreateOfferDto })
  create(@Body() createOfferDto: CreateOfferDto): Observable<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Alle Angebote abrufen',
    description: 'Ruft alle Versicherungsangebote ab'
  })
  @ApiResponse({ status: 200, description: 'Liste der Angebote' })
  findAll(): Observable<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Angebot nach ID abrufen',
    description: 'Ruft ein einzelnes Angebot anhand seiner ID ab'
  })
  @ApiParam({ name: 'id', description: 'Angebots-ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Angebot gefunden' })
  @ApiResponse({ status: 404, description: 'Angebot nicht gefunden' })
  findOne(@Param('id') id: string): Observable<Offer> {
    return this.offersService.findOne(id);
  }

  @Post(':id/calculate')
  @ApiOperation({
    summary: 'Prämie für bestehendes Angebot berechnen',
    description: 'Berechnet die Prämie für ein bereits erstelltes Angebot und speichert sie'
  })
  @ApiParam({ name: 'id', description: 'Angebots-ID' })
  @ApiBody({ type: CalculateOfferDto })
  @ApiResponse({ status: 200, description: 'Prämie berechnet und Angebot aktualisiert' })
  @ApiResponse({ status: 404, description: 'Angebot nicht gefunden' })
  calculateOffer(
    @Param('id') id: string,
    @Body() calculateDto: CalculateOfferDto
  ): Observable<Offer> {
    return this.offersService.calculateAndSave(id, calculateDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Status eines Angebots aktualisieren',
    description: 'Ändert den Status eines Angebots (z.B. ACCEPTED, REJECTED)'
  })
  @ApiParam({ name: 'id', description: 'Angebots-ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(OfferStatus),
          description: 'Neuer Status'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Status aktualisiert' })
  @ApiResponse({ status: 404, description: 'Angebot nicht gefunden' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: OfferStatus
  ): Observable<Offer> {
    return this.offersService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Angebot löschen',
    description: 'Löscht ein Angebot permanent'
  })
  @ApiParam({ name: 'id', description: 'Angebots-ID' })
  @ApiResponse({ status: 200, description: 'Angebot gelöscht' })
  @ApiResponse({ status: 404, description: 'Angebot nicht gefunden' })
  remove(@Param('id') id: string): Observable<any> {
    return this.offersService.remove(id);
  }
}
