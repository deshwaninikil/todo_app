"use client";
import React, { useState } from "react";
import "./Container.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

export const Container = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const { user } = useAuth();

  const handleAddTodo = async () => {
    // Clear previous error messages
    setTitleError("");
    setDescriptionError("");

    // Validate input fields
    let hasError = false;
    if (!title.trim()) {
      setTitleError("Please fill title.");
      hasError = true;
    }
    if (!description.trim()) {
      setDescriptionError("Please fill description.");
      hasError = true;
    }

    if (hasError) {
      return; // Exit function if there are errors
    }

    try {
      // Payload to send to the API
      const payload = {
        title: title,
        description: description,
        userId: user.id,
      };

      // Make POST request to the API
      const response = await axios.post("/api/add_todo", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });

      // Handle success response
      console.log("Todo added successfully:", response.data);
      toast.success("Todo added successfully:");

      // Clear input fields after successful addition
      setTitle("");
      setDescription("");

      // Show success message (toast)
      // alert("Todo added successfully");
    } catch (error) {
      // Handle error
      if (error.response && error.response.data && error.response.data.error) {
        // setTitleError(error.response.data.error);
        toast.error("Todo list already exists");
      } else {
        toast.error("Please try again");
      }
    }
  };

  return (
    <section className="container">
      <div className="content">
        <h3 className="heading">Add a Todo</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <p className="error">{titleError}</p>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && <p className="error">{descriptionError}</p>}
        </div>
        <button className="add-button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
    </section>
  );
};
