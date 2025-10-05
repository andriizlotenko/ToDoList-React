import { useEffect, useState } from "react";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos.slice(0, 8));
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch todos");
        setIsLoading(false);
      });
  }, []);

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });
      setTodos(prev => prev.map(t => (t.id === id ? updatedTodo : t)));
    } catch {
      setError("Error updating todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, { method: "DELETE" });
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      setError("Error deleting todo");
    }
  };

  const addTodo = (title) => {
    if (!title.trim()) return;
    const newTodo = {
      id: Date.now(),
      todo: title,
      completed: false,
      userId: 1,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  return { todos, isLoading, error, toggleTodo, deleteTodo, addTodo };
}
