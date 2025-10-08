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
Передача props вниз: TodoList → TodoListView → TodoItem (передаються дані та callback-функції).
Виклик callbacks вгору: TodoItem → TodoList (контейнер) → useTodos (хук) → API та локальний стан.
  useTodos виконує API-запити:
-GET /todos?limit={limit}&skip={skip}
-PUT /todos/{id} (для перемикання статусу та редагування)
-DELETE /todos/{id}

Пошук: Фільтрація на стороні клієнта, яка застосовується до завдань на поточній сторінці (регістронезалежна).
Пагінація: Хук керує станами currentPage, limitPerPage, totalTodos через API-параметри limit та skip.

### Patterns used
Кастомний хук (useTodos) — інкапсуляція логіки роботи з даними та побічних ефектів (сайд-ефектів).
Розділення на контейнерні та презентаційні компоненти (Container / Presentational) — TodoList як контейнер, TodoListView/TodoItem як презентаційні.
Прокидування пропсів (Prop drilling) — props передаються вниз, callbacks викликаються вгору.
Песимістичні оновлення (Pessimistic updates) для редагування/перемикання/видалення — стан оновлюється після успішної відповіді від API.
Додавання та пошук на стороні клієнта (через локальний стан).
