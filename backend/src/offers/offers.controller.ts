import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OffersService } from './offers.service';
import { CreateOfferDto, CalculateOfferDto } from './dto/offer.dto';
import { Offer, OfferStatus } from './offer.schema';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  /**
   * POST /api/offers/calculate
   * Calculate premium without creating an offer
   */
  @Post('calculate')
  calculate(@Body() calculateOfferDto: CalculateOfferDto): Observable<{ premium: number; riskFactor: number }> {
    return this.offersService.calculatePremium(calculateOfferDto);
  }

  /**
   * POST /api/offers
   * Create a new offer
   */
  @Post()
  create(@Body() createOfferDto: CreateOfferDto): Observable<Offer> {
    return this.offersService.create(createOfferDto);
  }

  /**
   * GET /api/offers
   * Get all offers
   */
  @Get()
  findAll(): Observable<Offer[]> {
    return this.offersService.findAll();
  }

  /**
   * GET /api/offers/:id
   * Get offer by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Offer> {
    return this.offersService.findOne(id);
  }

  /**
   * POST /api/offers/:id/calculate
   * Calculate premium for existing offer
   */
  @Post(':id/calculate')
  calculateOffer(
    @Param('id') id: string,
    @Body() calculateDto: CalculateOfferDto
  ): Observable<Offer> {
    return this.offersService.calculateAndSave(id, calculateDto);
  }

  /**
   * PATCH /api/offers/:id/status
   * Update offer status
   */
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: OfferStatus
  ): Observable<Offer> {
    return this.offersService.updateStatus(id, status);
  }

  /**
   * DELETE /api/offers/:id
   * Delete offer
   */
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.offersService.remove(id);
  }
}
