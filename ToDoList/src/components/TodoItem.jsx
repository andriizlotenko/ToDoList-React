import { useState, useEffect, memo } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Stack
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";

function TodoItem({ id, title, completed, onDelete, onToggle, onEditTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  useEffect(() => {
    setEditTitle(title);
  }, [title]);

  const handleToggle = () => {
    onToggle(id);
  };

  const handleSave = async () => {
    const trimmed = (editTitle || "").trim();
    if (!trimmed) return;
    await onEditTitle(id, trimmed);
    setIsEditing(false);
  };

  return (
    <ListItem
      disablePadding
      sx={{
        mb: 1,
        border: '1px solid #eee',
        borderRadius: 2,
        '&:hover': { bgcolor: '#f9f9f9' }
      }}
      secondaryAction={
        <Stack direction="row" spacing={0}>
          {isEditing ? (
            <IconButton edge="end" onClick={handleSave} color="primary">
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" onClick={() => setIsEditing(true)} sx={{ color: 'text.secondary' }}>
              <EditOutlinedIcon />
            </IconButton>
          )}
          <IconButton edge="end" onClick={() => onDelete(id)} color="error">
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemButton onClick={handleToggle} dense sx={{ pr: 8 }}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <Checkbox
            edge="start"
            checked={Boolean(completed)}
            tabIndex={-1}
            disableRipple
            color="secondary"
          />
        </ListItemIcon>

        {isEditing ? (
          <TextField
            fullWidth
            variant="standard"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              variant: "body1",
              style: {
                textDecoration: completed ? "line-through" : "none",
                color: completed ? "#999" : "#333",
                transition: "color 0.2s"
              }
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default memo(TodoItem);