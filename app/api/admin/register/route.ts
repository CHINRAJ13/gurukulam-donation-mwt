import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // console.log(email);
    // console.log(password);

    // Protect registration route with a secret key
    const registrationSecret = request.headers.get("x-admin-secret");
    if (registrationSecret !== process.env.ADMIN_REGISTRATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    return NextResponse.json(
      { message: "Admin registered successfully", email: newAdmin.email },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
