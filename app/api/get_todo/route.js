// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"; // Import JWT library

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the getAllTodoLists function
export async function POST(req, res) {
  try {
    // Check for authorization token in the request headers
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    // Extract the token from the authorization header
    const token = authHeader.replace("Bearer ", "");

    // Verify the JWT token
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // Extract user ID from the decoded token
      const userId = decodedToken.userId;

      // Retrieve all todo lists associated with the specified user ID
      const todoLists = await prisma.todolist.findMany({
        where: { ownerId: Number(userId) }, // Convert userId to number if needed
      });

      // Return a successful response with the retrieved todo lists
      return NextResponse.json(
        { message: "Todo lists retrieved successfully", todoLists },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error verifying JWT token:", error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error retrieving todo lists:", error);
    // Return an error response with an error message
    return NextResponse.json(
      { error: "Failed to retrieve todo lists", details: error.message },
      { status: 500 }
    );
  }
}
