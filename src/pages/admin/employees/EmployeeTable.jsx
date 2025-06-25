import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const stickyHeaderStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  fontWeight: "bold",
};

const EmployeeTable = ({
  employees,
  loading,
  onDeleteClick = () => {},
  onViewClick = () => {},
  onEditClick = () => {},
  shiftFilter,
  setShiftFilter,
  shiftOptions = [],
}) => {
  return (
    <TableContainer
      component={Paper}
      className="custom-table-box"
      sx={{ maxHeight: 500, overflowY: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={stickyHeaderStyle}>Name</TableCell>
            <TableCell sx={stickyHeaderStyle}>Phone</TableCell>
            <TableCell sx={stickyHeaderStyle}>Email</TableCell>
            <TableCell sx={stickyHeaderStyle}>Address</TableCell>
            <TableCell sx={stickyHeaderStyle}>
              <Select
                value={shiftFilter}
                onChange={(e) => setShiftFilter(e.target.value)}
                variant="standard"
                displayEmpty
                fullWidth
                sx={{
                  fontWeight: "normal",
                  fontSize: "0.875rem",
                }}
              >
                <MenuItem value="All">
                  <strong>Shift Timings</strong>
                </MenuItem>
                {shiftOptions.map((shift) => (
                  <MenuItem key={shift} value={shift}>
                    {shift}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell sx={stickyHeaderStyle}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Loading employees...
                </Typography>
              </TableCell>
            </TableRow>
          ) : employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2" color="textSecondary">
                  No employee data found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow key={emp?.id}>
                <TableCell>{emp?.name}</TableCell>
                <TableCell>{emp?.phone_number}</TableCell>
                <TableCell>{emp?.email}</TableCell>
                <TableCell>{emp?.address?.address || "N/A"}</TableCell>
                <TableCell>{emp?.shift_timings || "N/A"}</TableCell>
                <TableCell>
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      onClick={() => onViewClick(emp.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => onEditClick(emp.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => onDeleteClick(emp)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
