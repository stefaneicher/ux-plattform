import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class HealthController {
  @Get('health')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Überprüft den Status der API und gibt Systeminformationen zurück'
  })
  @ApiResponse({
    status: 200,
    description: 'API ist betriebsbereit',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
        uptime: { type: 'number', example: 3600 },
        service: { type: 'string', example: 'ux-platform-backend' }
      }
    }
  })
  checkHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'ux-platform-backend',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'API Informationen',
    description: 'Gibt allgemeine Informationen über die API zurück'
  })
  @ApiResponse({
    status: 200,
    description: 'API Informationen',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Insurance Backend API' },
        version: { type: 'string', example: '1.0.0' },
        endpoints: {
          type: 'object',
          properties: {
            health: { type: 'string', example: '/health' },
            api: { type: 'string', example: '/api' }
          }
        }
      }
    }
  })
  getRoot() {
    return {
      message: 'Insurance Backend API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        api: '/api',
      },
    };
  }
}
