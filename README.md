# To-Do List App — Component Tree + Data Flow

App
 └── TodoList (Container)  — uses custom hook `useTodos`
      ├── State (via hook):
      │     - todos (current page array)
      │     - rawTodos (unfiltered page data)
      │     - isLoading
      │     - error
      │     - currentPage
      │     - limitPerPage
      │     - totalTodos
      │     - searchTerm
      ├── Methods (from useTodos):
      │     - addTodo(title)
      │     - deleteTodo(id)
      │     - toggleTodo(id)
      │     - editTodoTitle(id, newTitle)
      │     - goToNextPage(), goToPrevPage(), setLimit(limit)
      │     - setSearchTerm(term)
      └── TodoListView (Presentational)
           └── TodoItem (presentational, repeated)
                ├── Props:
                │     id, title, completed, onDelete(), onToggle(), onEditTitle()
                └── Local state:
                      - isEditing (edit field)
                      - editTitle (input value)
                      - localCompleted (visual sync with prop)

## Data Flow
- Props Down: TodoList → TodoListView → TodoItem (passes data & callbacks)
- Callbacks Up: TodoItem → TodoList (container) → useTodos (hook) → API & local state
- useTodos performs API queries:
  - GET /todos?limit={limit}&skip={skip}
  - PUT /todos/{id} (toggle, edit)
  - DELETE /todos/{id}
- Search: client-side filter applied to current page's todos (case-insensitive)
- Pagination: hook manages currentPage/limitPerPage/totalTodos via API `limit` & `skip`

### Patterns used
- Custom Hook (useTodos) — encapsulation of data logic and side effects
- Container / Presentational separation (TodoList container, TodoListView/TodoItem presentational)
- Prop drilling (props down, callbacks up)
- Pessimistic updates for edit/toggle/delete (state updated after API success)
- Client-side add & search (local state)
