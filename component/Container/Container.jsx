import React from "react";
import "./Container.css";

export const Container = () => {
  return (
    <section className="container">
      <div className="content">
        <h3 className="heading">Add a Todo</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" />
        </div>
        <button className="add-button">Add Todo</button>
      </div>
    </section>
  );
};
