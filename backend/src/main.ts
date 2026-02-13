import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  const corsOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:4200', 'http://localhost:3000'];
  
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });
  
  // Global prefix for API routes (excluding health endpoint)
  app.setGlobalPrefix('api', {
    exclude: ['health', ''],
  });

  // OpenAPI/Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Insurance Platform API')
    .setDescription('REST API für die CSS Insurance Demo Plattform - Verwaltung von Policen, Angeboten und Schadensfällen')
    .setVersion('1.0')
    .addTag('claims', 'Schadensfälle verwalten')
    .addTag('policies', 'Versicherungspolicen verwalten')
    .addTag('offers', 'Versicherungsangebote verwalten')
    .addTag('health', 'Health Check Endpoint')
    .addServer('http://localhost:3000', 'Lokale Entwicklungsumgebung')
    .addServer('https://api.production.com', 'Produktionsumgebung')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Insurance Platform API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Insurance Backend API running on: http://localhost:${port}/api`);
  console.log(`📚 OpenAPI Documentation available at: http://localhost:${port}/api-docs`);
  console.log(`💚 Health check available at: http://localhost:${port}/health`);
  console.log(`📊 MongoDB Connection: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/insurance'}`);
}

bootstrap();
