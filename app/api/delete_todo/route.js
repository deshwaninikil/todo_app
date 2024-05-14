// Import the necessary modules
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client outside of the request handler
const prisma = new PrismaClient();

// Define the deleteTodoList function
export async function DELETE(req, res) {
  try {
    const { userId, todoId } = await req.json();

    // Validate the incoming data
    if (!userId || !todoId) {
      return NextResponse.json(
        { error: "UserID and todoID are required for deletion" },
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
    console.error("Error deleting todo list:", error);
    // Return an error response with an error message
    return NextResponse.json(
      { error: "Failed to delete todo list", details: error.message },
      { status: 500 }
    );
  }
}
