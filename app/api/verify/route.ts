import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db';
import Donation from '@/models/Donation';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isMatch = expectedSignature === razorpay_signature;

    if (isMatch) {
      await connectToDatabase();

      // Update donation in DB
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { 
          status: 'success',
          paymentId: razorpay_payment_id 
        },
        { new: true }
      );

      return NextResponse.json({ message: 'Payment verified successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('VERIFICATION ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
