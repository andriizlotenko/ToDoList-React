import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import { useTodos } from "../hooks/useTodos";

function TodoApp() {
  const { todos, isLoading, error, addTodo, deleteTodo, toggleTodo } = useTodos();

  return (
    <div>
      <AddTodoForm onAddTodo={addTodo} />

      {isLoading && <p>Loading todos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <TodoList todos={todos} onRemoveTodo={deleteTodo} onToggleTodo={toggleTodo} />
    </div>
  );
}

export default TodoApp;
