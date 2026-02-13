import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/policy.dto';
import { Policy, PolicyStatus } from './policy.schema';

@ApiTags('policies')
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  @ApiOperation({
    summary: 'Neue Versicherungspolice erstellen',
    description: 'Erstellt eine neue Versicherungspolice für einen Kunden'
  })
  @ApiResponse({ status: 201, description: 'Police erfolgreich erstellt' })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabedaten' })
  @ApiBody({ type: CreatePolicyDto })
  create(@Body() createPolicyDto: CreatePolicyDto): Observable<Policy> {
    return this.policiesService.create(createPolicyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Alle Policen abrufen',
    description: 'Ruft alle Policen ab oder filtert nach Kunde'
  })
  @ApiQuery({ name: 'customerId', required: false, description: 'Filtert nach Kunden-ID' })
  @ApiResponse({ status: 200, description: 'Liste der Policen' })
  findAll(@Query('customerId') customerId?: string): Observable<Policy[]> {
    if (customerId) {
      return this.policiesService.findByCustomer(customerId);
    }
    return this.policiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Police nach ID abrufen',
    description: 'Ruft eine einzelne Police anhand ihrer ID ab'
  })
  @ApiParam({ name: 'id', description: 'Police-ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Police gefunden' })
  @ApiResponse({ status: 404, description: 'Police nicht gefunden' })
  findOne(@Param('id') id: string): Observable<Policy> {
    return this.policiesService.findOne(id);
  }

  @Get('number/:policyNumber')
  @ApiOperation({
    summary: 'Police nach Nummer abrufen',
    description: 'Ruft eine Police anhand ihrer Policennummer ab'
  })
  @ApiParam({ name: 'policyNumber', description: 'Policennummer (z.B. POL-2024-001234)' })
  @ApiResponse({ status: 200, description: 'Police gefunden' })
  @ApiResponse({ status: 404, description: 'Police nicht gefunden' })
  findByPolicyNumber(@Param('policyNumber') policyNumber: string): Observable<Policy> {
    return this.policiesService.findByPolicyNumber(policyNumber);
  }

  @Post(':id/activate')
  @ApiOperation({
    summary: 'Police aktivieren',
    description: 'Aktiviert eine Police und setzt ihren Status auf ACTIVE'
  })
  @ApiParam({ name: 'id', description: 'Police-ID' })
  @ApiResponse({ status: 200, description: 'Police aktiviert' })
  @ApiResponse({ status: 404, description: 'Police nicht gefunden' })
  activate(@Param('id') id: string): Observable<Policy> {
    return this.policiesService.activate(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Status einer Police aktualisieren',
    description: 'Ändert den Status einer Police'
  })
  @ApiParam({ name: 'id', description: 'Police-ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(PolicyStatus),
          description: 'Neuer Status'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Status aktualisiert' })
  @ApiResponse({ status: 404, description: 'Police nicht gefunden' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: PolicyStatus
  ): Observable<Policy> {
    return this.policiesService.updateStatus(id, status);
  }

  @Post(':id/cancel')
  @ApiOperation({
    summary: 'Police kündigen',
    description: 'Kündigt eine Police und setzt ihren Status auf CANCELLED'
  })
  @ApiParam({ name: 'id', description: 'Police-ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'Kündigungsgrund (optional)'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Police gekündigt' })
  @ApiResponse({ status: 404, description: 'Police nicht gefunden' })
  cancel(
    @Param('id') id: string,
    @Body('reason') reason?: string
  ): Observable<Policy> {
    return this.policiesService.cancel(id, reason);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Police löschen',
    description: 'Löscht eine Police permanent'
  })
  @ApiParam({ name: 'id', description: 'Police-ID' })
  @ApiResponse({ status: 200, description: 'Police gelöscht' })
  @ApiResponse({ status: 404, description: 'Police nicht gefunden' })
  remove(@Param('id') id: string): Observable<any> {
    return this.policiesService.remove(id);
  }
}
