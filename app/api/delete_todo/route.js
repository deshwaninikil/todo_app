// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"; // Import JWT library

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the deleteTodoList function
export async function DELETE(req, res) {
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

      const { todoId } = await req.json();

      // Validate the incoming data
      if (!todoId) {
        return NextResponse.json(
          { error: "TodoID is required for deletion" },
          { status: 400 }
        );
      }

      // Find the todo list by ID and user ID
      const todoList = await prisma.todolist.findUnique({
        where: { id: todoId, ownerId: userId },
      });

      // If todo list not found, return error
      if (!todoList) {
        return NextResponse.json(
          { error: "Todo list not found for the provided user" },
          { status: 404 }
        );
      }

      // Delete the todo list
      await prisma.todolist.delete({
        where: { id: todoId },
      });

      // Return a successful response
      return NextResponse.json(
        { message: "Todo list deleted successfully" },
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
    console.error("Error deleting todo list:", error);
    // Return an error response with an error message
    return NextResponse.json(
      { error: "Failed to delete todo list", details: error.message },
      { status: 500 }
    );
  }
}
