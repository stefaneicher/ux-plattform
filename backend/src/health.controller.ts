import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  checkHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'ux-platform-backend',
    };
  }

  @Get()
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
