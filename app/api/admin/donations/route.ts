import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET() {
  await dbConnect();
  try {
    const donations = await Donation.find({ status: "success" }).sort({ createdAt: -1 });
    return NextResponse.json(donations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}
