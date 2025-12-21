import { create } from 'zustand';
import { fetchTodosApi, toggleTodoApi, deleteTodoApi, updateTodoTitleApi } from '../store/todoService';

const useTodoStore = create((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  limitPerPage: 5,
  totalTodos: 0,
  searchTerm: "",

  fetchPage: async (page, limit) => {
    const currentPage = page || get().currentPage;
    const limitPerPage = limit || get().limitPerPage;

    set({ isLoading: true, error: null });
    const skipLocal = (currentPage - 1) * limitPerPage;

    try {
      const data = await fetchTodosApi(limitPerPage, skipLocal);

      set({
        todos: data.todos || [],
        totalTodos: typeof data.total === "number" ? data.total : (data.todos || []).length,
        isLoading: false,
        currentPage,
        limitPerPage
      });
    } catch (err) {
      set({ error: err.message || "Unknown error", isLoading: false });
    }
  },

  goToNextPage: () => {
    const { currentPage, totalTodos, limitPerPage, fetchPage } = get();
    const maxPage = Math.max(1, Math.ceil(totalTodos / limitPerPage));
    if (currentPage < maxPage) {
      fetchPage(currentPage + 1, limitPerPage);
    }
  },

  goToPrevPage: () => {
    const { currentPage, fetchPage, limitPerPage } = get();
    if (currentPage > 1) {
      fetchPage(currentPage - 1, limitPerPage);
    }
  },

  setLimit: (limit) => {
    get().fetchPage(1, limit);
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },

  toggleTodo: async (id) => {
    const { todos } = get();
    const t = todos.find((x) => x.id === id);
    if (!t) return;

    const updatedCompleted = !t.completed;
    set({
      todos: todos.map((x) => (x.id === id ? { ...x, completed: updatedCompleted } : x))
    });

    try {
      await toggleTodoApi(id, updatedCompleted);
    } catch (err) {
      console.error("Failed to toggle sync", err);
    }
  },

  deleteTodo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteTodoApi(id);

      const { todos, totalTodos, currentPage, limitPerPage, fetchPage } = get();
      const newTodos = todos.filter((x) => x.id !== id);
      set({
        todos: newTodos,
        totalTodos: Math.max(0, totalTodos - 1),
        isLoading: false
      });

      if (newTodos.length === 0 && currentPage > 1) {
        fetchPage(currentPage - 1, limitPerPage);
      } else if (newTodos.length === 0 && currentPage === 1) {
        fetchPage(1, limitPerPage);
      }

    } catch (err) {
      set({ error: err.message || "Error deleting todo", isLoading: false });
    }
  },

  editTodoTitle: async (id, newTitle) => {
    if (!newTitle || !newTitle.trim()) return;
    set({ isLoading: true, error: null });

    try {
      const updated = await updateTodoTitleApi(id, newTitle);

      set((state) => ({
        todos: state.todos.map((x) => (x.id === id ? { ...x, todo: updated.todo } : x)),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message || "Error editing todo", isLoading: false });
    }
  },

  addTodo: (title) => {
    if (!title || !title.trim()) return;
    const newTodo = {
      id: Date.now(),
      todo: title,
      completed: false,
      userId: 1,
    };

    set((state) => ({
      todos: [...state.todos, newTodo],
      totalTodos: state.totalTodos + 1
    }));
  },
}));

export default useTodoStore;