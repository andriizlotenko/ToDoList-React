import React, { useState } from "react";
import useTodos from "../hooks/useTodos";
import TodoListView from "./TodoListView";

export default function TodoList() {
  const {
    todos, isLoading, error,
    currentPage, limitPerPage, totalTodos,
    goToNextPage, goToPrevPage, setLimit,
    searchTerm, setSearchTerm,
    addTodo, deleteTodo, toggleTodo, editTodoTitle,
  } = useTodos(5);

  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (!newTask.trim()) return;
    addTodo(newTask.trim());
    setNewTask("");
  };

  return (
    <TodoListView
      todos={todos}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      limitPerPage={limitPerPage}
      totalTodos={totalTodos}
      onNext={goToNextPage}
      onPrev={goToPrevPage}
      onSetLimit={setLimit}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
      newTask={newTask}
      onNewTaskChange={setNewTask}
      onAdd={handleAdd}
      onDelete={deleteTodo}
      onToggle={toggleTodo}
      onEditTitle={editTodoTitle}
    />
  );
}
