import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { Policy, PolicyDocument, PolicyStatus } from './policy.schema';
import { CreatePolicyDto } from './dto/policy.dto';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectModel(Policy.name) private policyModel: Model<PolicyDocument>,
  ) {}

  /**
   * Generate unique policy number
   */
  private generatePolicyNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `POL-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Create a new policy
   */
  create(createPolicyDto: CreatePolicyDto): Observable<Policy> {
    const policyNumber = this.generatePolicyNumber();
    const createdPolicy = new this.policyModel({
      ...createPolicyDto,
      policyNumber,
      status: PolicyStatus.PENDING,
    });
    return from(createdPolicy.save());
  }

  /**
   * Find all policies
   */
  findAll(): Observable<Policy[]> {
    return from(this.policyModel.find().exec());
  }

  /**
   * Find policies by customer ID
   */
  findByCustomer(customerId: string): Observable<Policy[]> {
    return from(this.policyModel.find({ customerId }).exec());
  }

  /**
   * Find policy by ID
   */
  findOne(id: string): Observable<Policy> {
    return from(this.policyModel.findById(id).exec());
  }

  /**
   * Find policy by policy number
   */
  findByPolicyNumber(policyNumber: string): Observable<Policy> {
    return from(this.policyModel.findOne({ policyNumber }).exec());
  }

  /**
   * Activate policy
   */
  activate(id: string): Observable<Policy> {
    return from(
      this.policyModel.findByIdAndUpdate(
        id,
        { status: PolicyStatus.ACTIVE },
        { new: true }
      ).exec()
    );
  }

  /**
   * Update policy status
   */
  updateStatus(id: string, status: PolicyStatus): Observable<Policy> {
    return from(
      this.policyModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).exec()
    );
  }

  /**
   * Cancel policy
   */
  cancel(id: string, reason?: string): Observable<Policy> {
    return from(
      this.policyModel.findByIdAndUpdate(
        id,
        { 
          status: PolicyStatus.CANCELLED,
          notes: reason 
        },
        { new: true }
      ).exec()
    );
  }

  /**
   * Delete policy
   */
  remove(id: string): Observable<any> {
    return from(this.policyModel.findByIdAndDelete(id).exec());
  }
}
