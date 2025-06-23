import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, CircularProgress
} from '@mui/material';


const EmployeeTable = ({ employees, loading }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <TableContainer component={Paper} className="custom-table-box">
        <Table aria-label="Employees Table" className="employees-table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Shift Timing</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                  <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
                    Loading employees...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No employee data found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.phone_number}</TableCell>
                  <TableCell>{emp.address?.address || 'N/A'}</TableCell>
                  <TableCell>{emp.shift_timings || 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleOpenDialog(emp)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent dividers className="dialog-box">
          {selectedEmployee && (
            <div className="dialog-details">
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phone_number}</p>
              <p><strong>Address:</strong> {selectedEmployee.address?.address || 'N/A'}</p>
              <p><strong>Shift Timing:</strong> {selectedEmployee.shift_timings || 'N/A'}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeTable;
