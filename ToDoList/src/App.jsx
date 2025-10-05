import TodoList from "./components/TodoList";
import "./App.css";

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1>To-Do List</h1>
        <TodoList />
      </div>
    </div>
  );
}
