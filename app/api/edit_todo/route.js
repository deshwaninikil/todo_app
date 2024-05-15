// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"; // Import JWT library

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the editTodoList function
export async function PUT(req, res) {
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

      const { todoId, title, description } = await req.json();

      // Validate the incoming data
      if (!todoId || (!title && !description)) {
        return NextResponse.json(
          {
            error:
              "TodoID and at least one of title or description are required for editing",
          },
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

      // Update the todo list with the provided data
      const updatedTodoList = await prisma.todolist.update({
        where: { id: todoId },
        data: {
          title: title || todoList.title,
          description: description || todoList.description,
        },
      });

      // Return a successful response with the updated todo list
      return NextResponse.json(
        { message: "Todo list updated successfully", updatedTodoList },
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
    console.error("Error editing todo list:", error);
    // Return an error response with an error message
    return NextResponse.json(
      { error: "Failed to edit todo list", details: error.message },
      { status: 500 }
    );
  }
}
