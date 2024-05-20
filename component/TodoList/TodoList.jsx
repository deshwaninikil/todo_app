"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TodoList.css";

const TodoList = () => {
  const { user } = useAuth();
  const [todoLists, setTodoLists] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await axios.post(
          "/api/get_todo",
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTodoLists(response.data.todoLists);
      } catch (error) {
        console.error("Failed to fetch todo lists:", error);
      }
    };

    if (userId) {
      fetchTodoLists();
    }
  }, [userId]);

  const handleDeleteTodo = async (todoId) => {
    try {
      const token = localStorage.getItem("user_token");
      await axios.delete(`/api/delete_todo`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId, todoId },
      });
      setTodoLists(todoLists.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleEditTodo = async (todoId) => {
    try {
      const token = localStorage.getItem("user_token");
      await axios.put(
        `/api/edit_todo`,
        {
          userId,
          todoId,
          title: editedTitle,
          description: editedDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingTodo(null);
      setEditedTitle("");
      setEditedDescription("");
      // You may want to refresh the todo list after editing
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  };

  return (
    <div className="todo-list-container">
      <h2 className="todo-list-heading">Todo List</h2>
      <div className="todo-list">
        {todoLists.map((todo) => (
          <div key={todo.id} className="todo-card">
            {editingTodo === todo.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  placeholder="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
                <button onClick={() => handleEditTodo(todo.id)}>Save</button>
              </div>
            ) : (
              <>
                <h3 className="todo-title">{todo.title}</h3>
                <p className="todo-description">{todo.description}</p>
                <div className="todo-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setEditingTodo(todo.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
