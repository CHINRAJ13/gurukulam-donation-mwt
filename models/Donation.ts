import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  donorName?: string;
  email?: string;
  amount: number;
  currency: string;
  cause: string;
  category: string;
  isMonthly: boolean;
  orderId: string;
  paymentId?: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema: Schema = new Schema(
  {
    donorName: { type: String },
    email: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    cause: { type: String, required: true },
    category: { type: String },
    isMonthly: { type: Boolean, default: false },
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
