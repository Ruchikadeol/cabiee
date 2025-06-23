import React, { useEffect, useState } from "react";
import { getAllEmployeesApi, addEmployeeApi } from "../../../api/apiFunction";
import EmployeeTable from "./EmployeeTable";
import CommonSearchBar from "../../../components/CommonSearchBar";
import PrimaryButton from "../../../components/PrimaryButton";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUpdateEmployee from "./AddUpdateEmployee";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getAllEmployeesApi();
      if (res?.data?.success) {
        setEmployees(res.data.data);
      } else {
        toast.error("Failed to load employees");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const res = await addEmployeeApi(newEmployee);
      if (res?.data?.success) {
        toast.success("Employee added successfully");
        fetchEmployees(); // Refresh list
      } else {
        toast.error(res?.data?.message || "Failed to add employee");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while adding employee");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <PrimaryButton onClick={() => setOpenDialog(true)}>
          + Add Employee
        </PrimaryButton>
      </div>

      <AddUpdateEmployee
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onAddEmployee={handleAddEmployee}
      />

      <EmployeeTable employees={filteredEmployees} loading={loading} />
    </div>
  );
};

export default Employee;
