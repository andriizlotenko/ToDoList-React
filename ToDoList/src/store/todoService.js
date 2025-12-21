const API_BASE = "https://dummyjson.com/todos";

export const fetchTodosApi = async (limit, skip) => {
  const res = await fetch(`${API_BASE}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error(`Failed to fetch todos: ${res.status}`);
  return await res.json();
};

export const toggleTodoApi = async (id, isCompleted) => {
  return await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: isCompleted }),
  });
};

export const deleteTodoApi = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
  return res.json();
};

export const updateTodoTitleApi = async (id, newTitle) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: newTitle }),
  });
  if (!res.ok) throw new Error(`Failed to update title: ${res.status}`);
  return await res.json();
};