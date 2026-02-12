import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClaimsService } from './claims.service';
import { CreateClaimDto, ReviewClaimDto } from './dto/claim.dto';
import { Claim, ClaimStatus } from './claim.schema';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  /**
   * POST /api/claims
   * Create a new claim
   */
  @Post()
  create(@Body() createClaimDto: CreateClaimDto): Observable<Claim> {
    return this.claimsService.create(createClaimDto);
  }

  /**
   * GET /api/claims
   * Get all claims or filter by policy/customer
   */
  @Get()
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

  /**
   * GET /api/claims/:id
   * Get claim by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Claim> {
    return this.claimsService.findOne(id);
  }

  /**
   * GET /api/claims/number/:claimNumber
   * Get claim by claim number
   */
  @Get('number/:claimNumber')
  findByClaimNumber(@Param('claimNumber') claimNumber: string): Observable<Claim> {
    return this.claimsService.findByClaimNumber(claimNumber);
  }

  /**
   * POST /api/claims/:id/review/start
   * Start claim review
   */
  @Post(':id/review/start')
  startReview(@Param('id') id: string): Observable<Claim> {
    return this.claimsService.startReview(id);
  }

  /**
   * POST /api/claims/:id/review
   * Review and approve/reject claim
   */
  @Post(':id/review')
  review(
    @Param('id') id: string,
    @Body() reviewDto: ReviewClaimDto
  ): Observable<Claim> {
    return this.claimsService.review(id, reviewDto);
  }

  /**
   * POST /api/claims/:id/pay
   * Mark claim as paid
   */
  @Post(':id/pay')
  markAsPaid(@Param('id') id: string): Observable<Claim> {
    return this.claimsService.markAsPaid(id);
  }

  /**
   * GET /api/claims/policy/:policyId/billing
   * Calculate billing for a policy
   */
  @Get('policy/:policyId/billing')
  calculateBilling(@Param('policyId') policyId: string): Observable<{ total: number; count: number }> {
    return this.claimsService.calculateBilling(policyId);
  }

  /**
   * PATCH /api/claims/:id/status
   * Update claim status
   */
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: ClaimStatus
  ): Observable<Claim> {
    return this.claimsService.updateStatus(id, status);
  }

  /**
   * DELETE /api/claims/:id
   * Delete claim
   */
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.claimsService.remove(id);
  }
}
