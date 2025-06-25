import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteEmployee = ({ open, onClose, employee, onDelete }) => {
  if (!employee) return null;

  const handleConfirmDelete = () => {
    onDelete(employee.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}   PaperProps={{
        sx: {
          height: "150px",
          width: "560px",
        },}}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete{" "}
          <strong>{employee.name}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEmployee;
