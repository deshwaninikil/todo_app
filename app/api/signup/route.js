// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the post function
export async function POST(req, res) {
  try {
    const { email, firstName, lastName, password } = await req.json();

    // Check if email is provided
    // if (!email) {
    //   return NextResponse.json({ error: "Email is required" }, { status: 400 });
    // }
    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json(
        {
          error:
            "All fields (email, firstName, lastName, password) are required",
        },
        { status: 400 }
      );
    }

    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: { email, firstName, lastName, password: hashedPassword },
    });

    // Return success response with the created user
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error signing up user:", error);
    // Return an error response if an error occurs during user creation
    return NextResponse.json(
      { error: "Failed to sign up user", details: error.message },
      { status: 500 }
    );
  }
}
