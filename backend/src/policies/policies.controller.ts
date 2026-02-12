import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/policy.dto';
import { Policy, PolicyStatus } from './policy.schema';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  /**
   * POST /api/policies
   * Create a new policy
   */
  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto): Observable<Policy> {
    return this.policiesService.create(createPolicyDto);
  }

  /**
   * GET /api/policies
   * Get all policies or filter by customer
   */
  @Get()
  findAll(@Query('customerId') customerId?: string): Observable<Policy[]> {
    if (customerId) {
      return this.policiesService.findByCustomer(customerId);
    }
    return this.policiesService.findAll();
  }

  /**
   * GET /api/policies/:id
   * Get policy by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Policy> {
    return this.policiesService.findOne(id);
  }

  /**
   * GET /api/policies/number/:policyNumber
   * Get policy by policy number
   */
  @Get('number/:policyNumber')
  findByPolicyNumber(@Param('policyNumber') policyNumber: string): Observable<Policy> {
    return this.policiesService.findByPolicyNumber(policyNumber);
  }

  /**
   * POST /api/policies/:id/activate
   * Activate policy
   */
  @Post(':id/activate')
  activate(@Param('id') id: string): Observable<Policy> {
    return this.policiesService.activate(id);
  }

  /**
   * PATCH /api/policies/:id/status
   * Update policy status
   */
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: PolicyStatus
  ): Observable<Policy> {
    return this.policiesService.updateStatus(id, status);
  }

  /**
   * POST /api/policies/:id/cancel
   * Cancel policy
   */
  @Post(':id/cancel')
  cancel(
    @Param('id') id: string,
    @Body('reason') reason?: string
  ): Observable<Policy> {
    return this.policiesService.cancel(id, reason);
  }

  /**
   * DELETE /api/policies/:id
   * Delete policy
   */
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.policiesService.remove(id);
  }
}
