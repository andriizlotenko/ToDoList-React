import React, { useState, useEffect } from "react";
import "./TodoItem.css";

export default function TodoItem({ id, title, completed, onDelete, onToggle, onEditTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [localCompleted, setLocalCompleted] = useState(Boolean(completed));

  useEffect(() => {
    setEditTitle(title);
  }, [title]);

  useEffect(() => {
    setLocalCompleted(Boolean(completed));
  }, [completed]);

  const handleToggle = () => {
    onToggle(id);
    setLocalCompleted((c) => !c);
  };

  const handleSave = async () => {
    const trimmed = (editTitle || "").trim();
    if (!trimmed) return;
    await onEditTitle(id, trimmed);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={localCompleted}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        {!isEditing ? (
          <span className={`todo-title ${localCompleted ? "completed" : ""}`}>{title}</span>
        ) : (
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
        )}
      </div>

      <div className="todo-actions">
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <button className="save-btn" onClick={handleSave}>Save</button>
        )}
        <button className="delete-btn" onClick={() => onDelete(id)}>✖</button>
      </div>
    </li>
  );
}
