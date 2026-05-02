import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectToDatabase from '@/lib/db';
import Donation from '@/models/Donation';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, cause, category, donorName, email, isMonthly } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    await connectToDatabase();

    // Create Razorpay order
    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save pending donation to DB
    await Donation.create({
      donorName,
      email,
      amount,
      cause: cause || 'General',
      category: category || 'General',
      isMonthly: isMonthly || false,
      orderId: order.id,
      status: 'pending',
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('RAZORPAY ORDER ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
