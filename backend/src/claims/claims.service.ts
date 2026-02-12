import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { Claim, ClaimDocument, ClaimStatus } from './claim.schema';
import { CreateClaimDto, ReviewClaimDto } from './dto/claim.dto';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
  ) {}

  /**
   * Generate unique claim number
   */
  private generateClaimNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `CLM-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Create a new claim
   */
  create(createClaimDto: CreateClaimDto): Observable<Claim> {
    const claimNumber = this.generateClaimNumber();
    const createdClaim = new this.claimModel({
      ...createClaimDto,
      claimNumber,
      status: ClaimStatus.SUBMITTED,
    });
    return from(createdClaim.save());
  }

  /**
   * Find all claims
   */
  findAll(): Observable<Claim[]> {
    return from(this.claimModel.find().exec());
  }

  /**
   * Find claims by policy ID
   */
  findByPolicy(policyId: string): Observable<Claim[]> {
    return from(this.claimModel.find({ policyId }).exec());
  }

  /**
   * Find claims by customer ID
   */
  findByCustomer(customerId: string): Observable<Claim[]> {
    return from(this.claimModel.find({ customerId }).exec());
  }

  /**
   * Find claim by ID
   */
  findOne(id: string): Observable<Claim> {
    return from(this.claimModel.findById(id).exec());
  }

  /**
   * Find claim by claim number
   */
  findByClaimNumber(claimNumber: string): Observable<Claim> {
    return from(this.claimModel.findOne({ claimNumber }).exec());
  }

  /**
   * Start review process
   */
  startReview(id: string): Observable<Claim> {
    return from(
      this.claimModel.findByIdAndUpdate(
        id,
        { status: ClaimStatus.UNDER_REVIEW },
        { new: true }
      ).exec()
    );
  }

  /**
   * Review and approve/reject claim
   */
  review(id: string, reviewDto: ReviewClaimDto): Observable<Claim> {
    const updateData: any = {
      status: reviewDto.decision === 'APPROVED' ? ClaimStatus.APPROVED : ClaimStatus.REJECTED,
      reviewNotes: reviewDto.reviewNotes,
    };

    if (reviewDto.decision === 'APPROVED') {
      updateData.approvedAmount = reviewDto.approvedAmount;
    } else {
      updateData.rejectionReason = reviewDto.rejectionReason;
    }

    return from(
      this.claimModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
    );
  }

  /**
   * Mark claim as paid
   */
  markAsPaid(id: string): Observable<Claim> {
    return from(
      this.claimModel.findByIdAndUpdate(
        id,
        { 
          status: ClaimStatus.PAID,
          paymentDate: new Date()
        },
        { new: true }
      ).exec()
    );
  }

  /**
   * Update claim status
   */
  updateStatus(id: string, status: ClaimStatus): Observable<Claim> {
    return from(
      this.claimModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).exec()
    );
  }

  /**
   * Delete claim
   */
  remove(id: string): Observable<any> {
    return from(this.claimModel.findByIdAndDelete(id).exec());
  }

  /**
   * Calculate billing - sum of approved claims for a policy
   */
  calculateBilling(policyId: string): Observable<{ total: number; count: number }> {
    return new Observable((observer) => {
      this.claimModel
        .find({ policyId, status: { $in: [ClaimStatus.APPROVED, ClaimStatus.PAID] } })
        .exec()
        .then((claims) => {
          const total = claims.reduce((sum, claim) => sum + (claim.approvedAmount || 0), 0);
          observer.next({ total, count: claims.length });
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
