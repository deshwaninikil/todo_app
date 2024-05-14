// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the login function
export async function POST(req, res) {
  try {
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toString() },
      include: { todolists: true }, // Include the user's todo lists
    });

    // If user not found, return error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Return success response with the logged-in user and their todo lists
    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    // Return an error response if an error occurs during login
    return NextResponse.json(
      { error: "Failed to log in", details: error.message },
      { status: 500 }
    );
  }
}
