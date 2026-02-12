import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, map } from 'rxjs';
import { Offer, OfferDocument, OfferStatus, InsuranceType } from './offer.schema';
import { CreateOfferDto, CalculateOfferDto } from './dto/offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
  ) {}

  /**
   * Calculate premium based on coverage, deductible, and risk factors
   * This is a simplified calculation for demo purposes
   */
  calculatePremium(dto: CalculateOfferDto): Observable<{ premium: number; riskFactor: number }> {
    return new Observable((observer) => {
      // Base premium calculation
      const basePremium = dto.coverageAmount * 0.05; // 5% of coverage
      
      // Deductible discount (higher deductible = lower premium)
      const deductibleDiscount = dto.deductible > 0 ? dto.deductible * 0.001 : 0;
      
      // Insurance type factor
      const typeFactor = {
        [InsuranceType.HEALTH]: 1.2,
        [InsuranceType.LIFE]: 1.0,
        [InsuranceType.PROPERTY]: 0.8,
        [InsuranceType.VEHICLE]: 1.1,
        [InsuranceType.LIABILITY]: 0.9,
      }[dto.insuranceType] || 1.0;
      
      // Age factor (if provided)
      const ageFactor = dto.customerAge 
        ? 1 + (dto.customerAge - 30) * 0.01 
        : 1.0;
      
      // Calculate risk factor
      const riskFactor = typeFactor * ageFactor;
      
      // Final premium calculation
      const premium = Math.round((basePremium - deductibleDiscount) * riskFactor * 100) / 100;
      
      observer.next({ premium, riskFactor });
      observer.complete();
    });
  }

  /**
   * Create a new offer
   */
  create(createOfferDto: CreateOfferDto): Observable<Offer> {
    const createdOffer = new this.offerModel({
      ...createOfferDto,
      status: OfferStatus.DRAFT,
    });
    return from(createdOffer.save());
  }

  /**
   * Calculate and update offer with premium
   */
  calculateAndSave(id: string, calculateDto: CalculateOfferDto): Observable<Offer> {
    return this.calculatePremium(calculateDto).pipe(
      map(({ premium, riskFactor }) => {
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 30); // Valid for 30 days
        
        return from(
          this.offerModel.findByIdAndUpdate(
            id,
            {
              calculatedPremium: premium,
              riskFactor,
              status: OfferStatus.CALCULATED,
              validUntil,
            },
            { new: true }
          ).exec()
        );
      }),
      map((observable) => observable as any)
    ) as any;
  }

  /**
   * Find all offers
   */
  findAll(): Observable<Offer[]> {
    return from(this.offerModel.find().exec());
  }

  /**
   * Find offer by ID
   */
  findOne(id: string): Observable<Offer> {
    return from(this.offerModel.findById(id).exec());
  }

  /**
   * Update offer status
   */
  updateStatus(id: string, status: OfferStatus): Observable<Offer> {
    return from(
      this.offerModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).exec()
    );
  }

  /**
   * Delete offer
   */
  remove(id: string): Observable<any> {
    return from(this.offerModel.findByIdAndDelete(id).exec());
  }
}
