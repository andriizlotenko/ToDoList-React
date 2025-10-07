import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoListView(props) {
  const {
    todos, isLoading, error,
    currentPage, limitPerPage, totalTodos,
    onNext, onPrev, onSetLimit,
    searchTerm, onSearch,
    newTask, onNewTaskChange, onAdd,
    onDelete, onToggle, onEditTitle,
  } = props;

  const maxPage = Math.max(1, Math.ceil(totalTodos / limitPerPage));

  return (
    <div className="todo-container">
      <div className="controls-row">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="todo-input search"
        />
        <select
          value={limitPerPage}
          onChange={(e) => onSetLimit(Number(e.target.value))}
          className="limit-select"
        >
          <option value={3}>3 / page</option>
          <option value={5}>5 / page</option>
          <option value={8}>8 / page</option>
        </select>
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          value={newTask}
          onChange={(e) => onNewTaskChange(e.target.value)}
          placeholder="Add new task..."
          className="todo-input"
          onKeyDown={(e) => { if (e.key === "Enter") onAdd(); }}
        />
        <button onClick={onAdd} className="todo-add-btn">Add</button>
      </div>

      <div className="meta-row">
        <div>
          Page {currentPage} / {maxPage} · Total: {totalTodos}
        </div>
        <div>
          <button onClick={onPrev} disabled={currentPage <= 1} className="page-btn">Prev</button>
          <button onClick={onNext} disabled={currentPage >= maxPage} className="page-btn">Next</button>
        </div>
      </div>

      {isLoading && <p className="center">Loading...</p>}
      {error && <p className="center error">Error: {error}</p>}

      <ul className="todo-list">
        {todos.length === 0 && !isLoading && <li className="empty">No tasks found.</li>}
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            id={t.id}
            title={t.todo}
            completed={t.completed}
            onDelete={onDelete}
            onToggle={onToggle}
            onEditTitle={onEditTitle}
          />
        ))}
      </ul>
    </div>
  );
}
