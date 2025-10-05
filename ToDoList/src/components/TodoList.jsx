import React, { useState } from "react";
import useTodos from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoList() {
  const { todos, isLoading, error, toggleTodo, deleteTodo, addTodo } = useTodos();
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      addTodo(newTask);
      setNewTask("");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="todo-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="todo-input"
        />
        <button onClick={handleAdd} className="todo-add-btn">
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.todo}
            completed={todo.completed}
            onRemoveTodo={deleteTodo}
            onToggleTodo={toggleTodo}
          />
        ))}
      </ul>
    </div>
  );
}
