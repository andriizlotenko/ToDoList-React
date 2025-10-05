App
│
└── TodoList
     │
     ├── State:
     │     todos (array of todo objects)
     │     isLoading (boolean)
     │     error (string/object)
     │
     ├── Methods from useTodos:
     │     addTodo(title)
     │     toggleTodo(id)
     │     deleteTodo(id)
     │
     └── TodoItem (repeated for each todo)
             │
             ├── Props:
             │     id
             │     title
             │     completed
             │     onToggleTodo()  ← callback
             │     onRemoveTodo()  ← callback
             │
             └── State: none (relies on props for completed status)

TodoList → TodoItem
Передає дані про задачу (id, title, completed) і callback-функції (onToggleTodo, onRemoveTodo).

TodoItem → TodoList → useTodos
Коли користувач перемикає чекбокс або видаляє задачу, TodoItem викликає callback, який змінює стан у хуку.

useTodos
Зберігає todos, isLoading, error. Виконує API-запити (GET, PUT, DELETE).

useTodos → TodoList
Зміни стану автоматично оновлюють рендер списку задач у TodoList.