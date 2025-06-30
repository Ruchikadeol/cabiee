import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const ViewGroup = ({ open, onClose, group }) => {
  if (!group) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Group Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {/* <Typography><strong>ID:</strong> {group?.id}</Typography> */}
          <Typography><strong>Status:</strong> {group?.status}</Typography>
          <Typography><strong>Group Size:</strong> {group?.group_size}</Typography>
          <Typography><strong>Created At:</strong> {formatDate(group?.created_at)}</Typography>
          <Typography><strong>Updated At:</strong> {formatDate(group?.updated_at)}</Typography>
          <Typography><strong>View Members:</strong></Typography>
          <ul>
            {group?.description
              ?.split(" ")
              .filter(Boolean)
              .map((name, idx) => (
                <li key={idx}>👤 {name}</li>
              ))}
          </ul>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewGroup;
