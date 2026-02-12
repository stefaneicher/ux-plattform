import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
  });
  
  // Global prefix for all routes
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Insurance Backend API running on: http://localhost:${port}/api`);
  console.log(`📊 MongoDB Connection: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/insurance'}`);
}

bootstrap();
