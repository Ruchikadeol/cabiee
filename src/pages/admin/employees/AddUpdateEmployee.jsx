import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Map from "./Map";
import { SHIFT_TIMING } from "../../../constant/UserRole";

const AddUpdateEmployee = ({
  open,
  handleClose,
  onAddOrUpdateEmployee,
  initialValues = null,
  loading = false,
}) => {
  const isEdit = !!initialValues;

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    phone_number: "",
    shift_timings: "",
    address: {
      address: "",
      latitude: "",
      longitude: "",
    },
  });

  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      password: "",
      phone_number: "",
      shift_timings: "",
      address: { address: "", latitude: "", longitude: "" },
    });
    setErrors({});
    setActiveStep(0);
  };

  useEffect(() => {
    if (initialValues) {
      setFormData({
        email: initialValues.email || "",
        name: initialValues.name || "",
        password: "", // Don't pre-fill password on edit
        phone_number: initialValues.phone_number || "",
        shift_timings: initialValues.shift_timings || "",
        address: {
          address: initialValues.address?.address || "",
          latitude: initialValues.address?.latitude || "",
          longitude: initialValues.address?.longitude || "",
        },
      });
    } else {
      resetForm();
    }
  }, [initialValues]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (["address", "latitude", "longitude"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleLocationSelect = useCallback(({ latitude, longitude }) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        latitude,
        longitude,
      },
    }));
  }, []);

  const validateStep1 = () => {
    const { name, email, password, phone_number, shift_timings } = formData;
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!isEdit && !password.trim())
      newErrors.password = "Password is required";
    else if (!isEdit && password.length < 6)
      newErrors.password = "Minimum 6 characters";
    if (!/^\d{10}$/.test(phone_number))
      newErrors.phone_number = "Enter valid 10-digit number";
    if (!shift_timings.trim()) newErrors.shift_timings = "Select shift timing";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const { address, latitude, longitude } = formData.address;
    const newErrors = {};
    if (!address.trim()) newErrors.address = "Address is required";
    if (!latitude || isNaN(latitude))
      newErrors.latitude = "Latitude is required";
    if (!longitude || isNaN(longitude))
      newErrors.longitude = "Longitude is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateStep1()) {
      setActiveStep(1);
    } else if (activeStep === 1 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const dataToSubmit = { ...formData };
    if (isEdit) delete dataToSubmit.password;
    onAddOrUpdateEmployee(dataToSubmit, isEdit ? initialValues.id : null);
    resetForm();
  };

  const memoizedUserForm = useMemo(
    () => (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {/* Name */}
        <div style={{ flex: "1 1 45%" }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name || ""}
            disabled={loading}
          />
        </div>

        {/* Email (disabled in edit mode) */}
        <div style={{ flex: "1 1 45%" }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email || ""}
            disabled={isEdit || loading} // ← Disabled in edit mode
          />
        </div>

        {/* Password (only in add mode) */}
        {!isEdit && (
          <div style={{ flex: "1 1 45%" }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || ""}
              disabled={loading}
            />
          </div>
        )}

        {/* Phone Number */}
        <div style={{ flex: "1 1 45%" }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            error={!!errors.phone_number}
            helperText={errors.phone_number || ""}
            disabled={loading}
          />
        </div>

        {/* Shift Timings */}
        <TextField
          select
          fullWidth
          label="Select Shift Timings"
          name="shift_timings"
          value={formData.shift_timings}
          onChange={handleChange}
          error={!!errors.shift_timings}
          helperText={errors.shift_timings || ""}
          disabled={loading}
        >
          <MenuItem value="">Select a shift</MenuItem>
          {SHIFT_TIMING.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    ),
    [formData, errors, handleChange, loading, isEdit]
  );

  const memoizedMap = useMemo(
    () => (
      <Map
        latitude={formData.address.latitude || 30.7333}
        longitude={formData.address.longitude || 76.7794}
        onLocationSelect={handleLocationSelect}
      />
    ),
    [
      formData.address.latitude,
      formData.address.longitude,
      handleLocationSelect,
    ]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "700px",
          height: "600px",
          maxWidth: "95vw",
          maxHeight: "95vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
        {isEdit ? "Edit Employee" : "Add Employee"}
        <IconButton
          onClick={handleClose}
          size="small"
          disableRipple
          disableFocusRipple
          disableTouchRipple
          className="clear-icon-button"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>User Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Address</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 ? (
          memoizedUserForm
        ) : (
          <div style={{ marginTop: 16 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ mb: 2 }}
              disabled={loading}
            />
            {memoizedMap}
          </div>
        )}
      </DialogContent>

      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={loading}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={loading}
          startIcon={loading && <CircularProgress size={16} />}
        >
          {activeStep === 1 ? (isEdit ? "Update" : "Submit") : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUpdateEmployee;
