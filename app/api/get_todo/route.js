// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the getAllTodoLists function
export async function POST(req, res) {
  try {
    // Extract userId from the request body
    const { userId } = await req.json();

    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

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
    console.error("Error retrieving todo lists:", error);
    // Return an error response with an error message
    return NextResponse.json(
      { error: "Failed to retrieve todo lists", details: error.message },
      { status: 500 }
    );
  }
}
