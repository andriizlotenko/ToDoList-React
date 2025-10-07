import { useEffect, useState, useCallback } from "react";

const API_BASE = "https://dummyjson.com/todos";

export default function useTodos(initialLimit = 5) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(initialLimit);
  const [totalTodos, setTotalTodos] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchPage = useCallback(async (page = currentPage, limit = limitPerPage) => {
    setIsLoading(true);
    setError(null);
    const skipLocal = (page - 1) * limit;
    try {
      const res = await fetch(`${API_BASE}?limit=${limit}&skip=${skipLocal}`);
      if (!res.ok) throw new Error(`Failed to fetch todos: ${res.status}`);
      const data = await res.json();
      setTodos(data.todos || []);
      setTotalTodos(typeof data.total === "number" ? data.total : (data.todos || []).length);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limitPerPage]);

  useEffect(() => {
    fetchPage(currentPage, limitPerPage);
  }, [currentPage, limitPerPage, fetchPage]);

  const goToNextPage = () => {
    const maxPage = Math.max(1, Math.ceil(totalTodos / limitPerPage));
    setCurrentPage((p) => (p < maxPage ? p + 1 : p));
  };

  const goToPrevPage = () => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
  };

  const setLimit = (limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };

  const toggleTodo = async (id) => {
    const t = todos.find((x) => x.id === id);
    if (!t) return;
    const updatedCompleted = !t.completed;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: updatedCompleted }),
      });
      if (!res.ok) throw new Error(`Failed to update todo: ${res.status}`);
      const updated = await res.json();
      setTodos((prev) => prev.map((x) => (x.id === id ? { ...x, completed: updated.completed } : x)));
    } catch (err) {
      setError(err.message || "Error toggling todo");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
      setTodos((prev) => prev.filter((x) => x.id !== id));
      setTotalTodos((t) => Math.max(0, t - 1));
      setTimeout(() => {
        if (todos.length === 1 && currentPage > 1) {
          setCurrentPage((p) => p - 1);
        } else {
          fetchPage(currentPage, limitPerPage);
        }
      }, 0);
    } catch (err) {
      setError(err.message || "Error deleting todo");
    } finally {
      setIsLoading(false);
    }
  };

  const editTodoTitle = async (id, newTitle) => {
    if (!newTitle || !newTitle.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });
      if (!res.ok) throw new Error(`Failed to update title: ${res.status}`);
      const updated = await res.json();
      setTodos((prev) => prev.map((x) => (x.id === id ? { ...x, todo: updated.todo } : x)));
    } catch (err) {
      setError(err.message || "Error editing todo");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = (title) => {
    if (!title || !title.trim()) return;
    const newTodo = {
      id: Date.now(),
      todo: title,
      completed: false,
      userId: 1,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTotalTodos((t) => t + 1);
  };

  const filteredTodos = (searchTerm || "").trim()
    ? todos.filter((t) => t.todo.toLowerCase().includes(searchTerm.toLowerCase()))
    : todos;

  return {
    todos: filteredTodos,
    rawTodos: todos,
    isLoading,
    error,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
    searchTerm,
    setSearchTerm,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
    refetch: () => fetchPage(currentPage, limitPerPage),
  };
}
