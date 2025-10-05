import "./TodoItem.css";

export default function TodoItem({ id, title, completed, onRemoveTodo, onToggleTodo }) {
  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleTodo(id)}
        />
        <span className={`todo-title ${completed ? "completed" : ""}`}>
          {title}
        </span>
      </div>
      <button className="todo-delete" onClick={() => onRemoveTodo(id)}>
        ✖
      </button>
    </li>
  );
}
