import { useState, useEffect, useCallback } from "react";
import useTodoStore from "../store/useTodoStore";
import TodoListView from "./TodoListView";

export default function TodoList() {
  const {
    todos, isLoading, error,
    currentPage, limitPerPage, totalTodos, searchTerm,
    fetchPage, goToNextPage, goToPrevPage, setLimit, setSearchTerm,
    addTodo, deleteTodo, toggleTodo, editTodoTitle
  } = useTodoStore();

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const filteredTodos = todos.filter((t) =>
    t.todo.toLowerCase().includes((searchTerm || "").trim().toLowerCase())
  );

  const handleAdd = useCallback(() => {
    if (!newTask.trim()) return;
    addTodo(newTask.trim());
    setNewTask("");
  }, [newTask, addTodo]);

  return (
    <div className="app-wrapper">
      <div className="app-container">

        <h1>To-Do List</h1>

        <TodoListView
          todos={filteredTodos}
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
      </div>
    </div>
  );
}