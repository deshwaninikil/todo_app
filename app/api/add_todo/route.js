// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"; // Import JWT library

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the createTodoList function
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

      // Extract other parameters from the request body
      const { title, description } = await req.json();

      // Validate the incoming data
      if (!title || !description) {
        return NextResponse.json(
          { error: "Title and description are required" },
          { status: 400 }
        );
      }

      // Check if title already exists
      const existingTitle = await prisma.todolist.findUnique({
        where: { title },
      });

      if (existingTitle) {
        return NextResponse.json(
          { error: `Todo list with title '${title}' already exists` },
          { status: 400 }
        );
      }

      // Create a new todo list associated with the user
      const todolist = await prisma.todolist.create({
        data: {
          title,
          description,
          owner: { connect: { id: userId } }, // Associate todo list with user
        },
      });

      // Return a successful response with a success message
      return NextResponse.json(
        { message: "Todo list created successfully", todolist },
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
    console.error("Error creating todo list:", error);
    // Return an error response with an error message
    return NextResponse.json(
      { error: "Failed to create todo list", details: error.message },
      { status: 500 }
    );
  }
}
