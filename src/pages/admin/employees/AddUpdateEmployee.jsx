import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Stepper, Step, StepLabel, Button, TextField, Grid
} from '@mui/material';

const AddUpdateEmployee = ({ open, handleClose, onAddEmployee }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phone_number: '',
    address: {
      address: '',
      latitude: '',
      longitude: ''
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['address', 'latitude', 'longitude'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user edits field
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    const { name, email, password, phone_number } = formData;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone_number)) {
      newErrors.phone_number = 'Phone must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const { address, latitude, longitude } = formData.address;

    if (!address.trim()) newErrors.address = 'Address is required';
    if (!latitude.trim()) {
      newErrors.latitude = 'Latitude is required';
    } else if (isNaN(latitude)) {
      newErrors.latitude = 'Latitude must be a number';
    }
    if (!longitude.trim()) {
      newErrors.longitude = 'Longitude is required';
    } else if (isNaN(longitude)) {
      newErrors.longitude = 'Longitude must be a number';
    }

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

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
      onAddEmployee(formData); 
    handleClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      password: '',
      phone_number: '',
      address: {
        address: '',
        latitude: '',
        longitude: ''
      }
    });
    setActiveStep(0);
    setErrors({});
  };

  const userFields = (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth label="Name" name="name"
          value={formData.name} onChange={handleChange}
          error={!!errors.name} helperText={errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth label="Email" name="email"
          value={formData.email} onChange={handleChange}
          error={!!errors.email} helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth label="Password" name="password"
          type="password" value={formData.password} onChange={handleChange}
          error={!!errors.password} helperText={errors.password}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth label="Phone Number" name="phone_number"
          value={formData.phone_number} onChange={handleChange}
          error={!!errors.phone_number} helperText={errors.phone_number}
        />
      </Grid>
    </Grid>
  );

  const addressFields = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth label="Address" name="address"
          value={formData.address.address} onChange={handleChange}
          error={!!errors.address} helperText={errors.address}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth label="Latitude" name="latitude"
          value={formData.address.latitude} onChange={handleChange}
          error={!!errors.latitude} helperText={errors.latitude}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth label="Longitude" name="longitude"
          value={formData.address.longitude} onChange={handleChange}
          error={!!errors.longitude} helperText={errors.longitude}
        />
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent dividers>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step><StepLabel>User Info</StepLabel></Step>
          <Step><StepLabel>Address</StepLabel></Step>
        </Stepper>

        <div style={{ marginTop: '20px' }}>
          {activeStep === 0 ? userFields : addressFields}
        </div>
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        <Button onClick={handleNext} variant="contained" color="primary">
          {activeStep === 0 ? 'Next' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUpdateEmployee;
