import TodoItem from "./TodoItem";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  List,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search tasks..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          sx={{ bgcolor: 'background.paper' }}
        />
        <FormControl size="small" sx={{ minWidth: 100, bgcolor: 'background.paper' }}>
          <InputLabel>Limit</InputLabel>
          <Select
            value={limitPerPage}
            label="Limit"
            onChange={(e) => onSetLimit(Number(e.target.value))}
          >
            <MenuItem value={3}>3 / page</MenuItem>
            <MenuItem value={5}>5 / page</MenuItem>
            <MenuItem value={8}>8 / page</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="New task description"
          variant="outlined"
          size="small"
          value={newTask}
          onChange={(e) => onNewTaskChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onAdd(); }}
          sx={{ bgcolor: 'background.paper' }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Add
        </Button>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'right' }}>
        Page {currentPage} of {maxPage} (Total: {totalTodos})
      </Typography>

      {isLoading && <Box display="flex" justifyContent="center" p={2}><CircularProgress size={24} /></Box>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <List sx={{ bgcolor: 'background.paper', borderRadius: 1, mb: 2, p: 0 }}>
        {todos.length === 0 && !isLoading && (
          <Typography align="center" sx={{ py: 3, color: 'text.disabled' }}>
            List is empty.
          </Typography>
        )}
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
      </List>

      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onPrev}
          disabled={currentPage <= 1}
        >
          Prev
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
          disabled={currentPage >= maxPage}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}