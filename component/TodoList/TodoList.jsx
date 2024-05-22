"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/(pages)/Loading/Loading";
import "./TodoList.css";

const TodoList = () => {
  const { user } = useAuth();
  const [todoLists, setTodoLists] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchTodoLists = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    if (userId) {
      fetchTodoLists();
    }
  }, [userId]);

  const handleDeleteTodo = async (todoId) => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleEditTodo = async (todoId) => {
    setLoading(true);
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
      setTodoLists((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? { ...todo, title: editedTitle, description: editedDescription }
            : todo
        )
      );
      setEditingTodo(null);
      setEditedTitle("");
      setEditedDescription("");
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
    setLoading(false);
  };

  const toggleDescription = (todoId) => {
    setExpandedDescriptions((prev) =>
      prev.includes(todoId)
        ? prev.filter((id) => id !== todoId)
        : [...prev, todoId]
    );
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const filteredTodos = todoLists.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="todo-list-container">
      <h2 className="heading">Todo List</h2>
      {todoLists.length > 0 && (
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input-todo"
        />
      )}
      {loading && <Loading />}
      {!loading && todoLists.length === 0 && (
        <p className="no-todos-message">
          No todos available. Kindly add a todo from the home page.
        </p>
      )}
      {!loading && todoLists.length > 0 && filteredTodos.length === 0 && (
        <p className="no-todos-message">No todos match your search query.</p>
      )}
      {!loading && (
        <div className="todo-list">
          {filteredTodos.map((todo) => (
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
                  <p
                    className="todo-description"
                    onClick={() => toggleDescription(todo.id)}
                  >
                    {expandedDescriptions.includes(todo.id)
                      ? todo.description
                      : truncateDescription(todo.description, 40)}
                  </p>
                  <div className="todo-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingTodo(todo.id);
                        setEditedTitle(todo.title);
                        setEditedDescription(todo.description);
                      }}
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
      )}
    </section>
  );
};

export default TodoList;
