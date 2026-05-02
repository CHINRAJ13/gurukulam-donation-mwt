import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Donation from '@/models/Donation';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();

    const successDonations = await Donation.find({ status: 'success' });
    const totalRaised = successDonations.reduce((acc: number, curr: any) => acc + curr.amount, 0);

    return NextResponse.json({ 
      raisedAmount: totalRaised + 1840000, // offset with existing/manually added total
      goalAmount: 5000000,
      donorCount: successDonations.length + 150 // offset
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
