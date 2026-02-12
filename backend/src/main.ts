import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Insurance Backend API running on: http://localhost:${port}/api`);
  console.log(`💚 Health check available at: http://localhost:${port}/health`);
  console.log(`📊 MongoDB Connection: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/insurance'}`);
}

bootstrap();
