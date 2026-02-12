import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { OffersModule } from './offers/offers.module';
import { PoliciesModule } from './policies/policies.module';
import { ClaimsModule } from './claims/claims.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/insurance',
      {
        // Connection options for production
        retryWrites: true,
        w: 'majority',
      }
    ),
    
    // Bull queue for job management
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    
    // Bounded Context Modules
    OffersModule,
    PoliciesModule,
    ClaimsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
