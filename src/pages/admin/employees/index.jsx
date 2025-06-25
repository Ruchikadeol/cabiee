import React, { useEffect, useState } from "react";
import {
  getAllEmployeesApi,
  addEmployeeApi,
  deleteEmployeeApi,
  getSpecificEmployeeApi,
  updateEmployeeApi,
} from "../../../api/apiFunction";

import EmployeeTable from "./EmployeeTable";
import CommonSearchBar from "../../../components/CommonSearchBar";
import PrimaryButton from "../../../components/PrimaryButton";
import AddUpdateEmployee from "./AddUpdateEmployee";
import DeleteEmployee from "./DeleteEmployee";
import ViewEmployee from "./ViewEmployee";
import { SHIFT_TIMING } from "../../../constant/UserRole";

import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shiftFilter, setShiftFilter] = useState("All");

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getAllEmployeesApi();
      if (res?.data?.success) {
        setEmployees(res.data.data || []);
      } else {
        toast.error("Failed to load employees");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateEmployee = async (data, id = null) => {
    setIsSubmitting(true);
    try {
      const res = id
        ? await updateEmployeeApi(id, data)
        : await addEmployeeApi(data);

      if (res?.data?.success) {
        toast.success(
          id ? "Employee updated successfully" : "Employee added successfully"
        );
        fetchEmployees();
        setOpenDialog(false);
      } else {
        toast.error(res?.data?.message || "Failed to save employee");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving employee");
    } finally {
      setIsSubmitting(false);
      setSelectedEmployee(null);
    }
  };

  const handleViewEmployee = async (employeeId) => {
    try {
      const res = await getSpecificEmployeeApi(employeeId);
      if (res?.data?.success) {
        setSelectedEmployee(res.data.data);
        setViewDialogOpen(true);
      } else {
        toast.error(res?.data?.message || "Failed to fetch employee details");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching details");
    }
  };

  const handleEditClick = async (employeeId) => {
    try {
      const res = await getSpecificEmployeeApi(employeeId);
      if (res?.data?.success) {
        setSelectedEmployee(res.data.data);
        setOpenDialog(true);
      } else {
        toast.error("Failed to fetch employee details");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching details");
    }
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteEmployee = async (employeeId) => {
    try {
      const res = await deleteEmployeeApi(employeeId);
      if (res?.data?.success) {
        toast.success("Employee deleted successfully");
        fetchEmployees();
      } else {
        toast.error(res?.data?.message || "Failed to delete employee");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      emp?.email?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      emp?.phone_number
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      emp?.address?.address
        ?.toLowerCase()
        ?.includes(debouncedSearchTerm.toLowerCase());

    const matchesShift =
      shiftFilter === "All" || emp?.shift_timings === shiftFilter;

    return matchesSearch && matchesShift;
  });

  return (
    <div className="users-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>

      <div className="employee-toolbar">
        <CommonSearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search employees..."
        />
        <PrimaryButton
          onClick={() => setOpenDialog(true)}
          className="add-employee-btn"
        >
          + Add Employee
        </PrimaryButton>
      </div>

      <AddUpdateEmployee
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onAddOrUpdateEmployee={handleAddOrUpdateEmployee}
        initialValues={selectedEmployee}
        loading={isSubmitting}
      />

      <EmployeeTable
        employees={filteredEmployees}
        loading={loading}
        onDeleteClick={handleDeleteEmployee}
        onViewClick={handleViewEmployee}
        onEditClick={handleEditClick}
        shiftFilter={shiftFilter}
        setShiftFilter={setShiftFilter}
        shiftOptions={SHIFT_TIMING}
      />

      <DeleteEmployee
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        employee={selectedEmployee}
        onDelete={confirmDeleteEmployee}
      />

      <ViewEmployee
        open={viewDialogOpen}
        handleClose={() => setViewDialogOpen(false)}
        onClose={() => setViewDialogOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default Employee;
