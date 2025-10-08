# To-Do List App — Component Tree + Data Flow

```mermaid
graph TD
    subgraph "Logic (Hook)"
        Hook(useTodos)
    end

    subgraph "UI (Components)"
        Container{{TodoList}}
        View[TodoListView]
        Item[TodoItem]
    end

    %% Styling
    style API fill:#f5f5f5,stroke:#555,stroke-width:1px
    style Hook fill:#f9f,stroke:#333,stroke-width:2px
    style Container fill:#bbf,stroke:#333,stroke-width:2px
    style View fill:#9f9,stroke:#333,stroke-width:2px
    style Item fill:#9f9,stroke:#333,stroke-width:2px

    %% Connections
    API -- GET, PUT, DELETE --> Hook
    Hook -- state & functions --> Container
    Container -- "props (todos, isLoading, deleteTodo, etc.)" --> View
    View -- "props (id, title, completed, onDelete, etc.)" --> Item
    Item -.->|"callbacks (onDelete, onToggle, onEditTitle)"| View
    View -.->|"callbacks (onSearch, onAdd, onNext, etc.)"| Container
```
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
