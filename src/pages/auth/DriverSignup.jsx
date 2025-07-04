import React, { useState } from "react";
import CommonInput from "../../components/CommonInput";
import PrimaryButton from "../../components/PrimaryButton";
import { isValidEmail } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { loginposter } from "../../assets/images";
import { cabDriverSignupApi } from "../../api/apiFunction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DriverSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    address: "",
    vehicle_number: "",
    bank_account: "",
    ifsc: "",
  });

  const [errors, setErrors] = useState({});

  const handleNavigate = () => {
    navigate("/signin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleValidate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.vehicle_number.trim()) {
      newErrors.vehicle_number = "Vehicle number is required";
      valid = false;
    }

    if (!formData.bank_account.trim()) {
      newErrors.bank_account = "Bank account is required";
      valid = false;
    }

    if (!formData.ifsc.trim()) {
      newErrors.ifsc = "IFSC code is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidate()) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      address: formData.address,
      vehicle_number: formData.vehicle_number,
      bank_account: formData.bank_account,
      ifsc: formData.ifsc,
    };

    try {
      const response = await cabDriverSignupApi(payload);
      if (response?.data?.success) {
        toast.success("Driver signup successful! 🚖");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userName", formData.name);
        navigate("/driver/dashboard"); // Change route as per your driver dashboard
      } else {
        toast.error(response?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Driver signup error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="signin_wrapper">
      <div className="left-side">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <h2>Welcome!</h2>
            <p>Please enter your details</p>

            <CommonInput
              label="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.name}
            />

            <CommonInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
            />

            <CommonInput
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              error={errors.phone_number}
            />

            <CommonInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              error={errors.address}
            />

            <CommonInput
              label="Vehicle Number"
              name="vehicle_number"
              value={formData.vehicle_number}
              onChange={handleChange}
              placeholder="Enter your vehicle number"
              error={errors.vehicle_number}
            />

            <CommonInput
              label="Bank Account Number"
              name="bank_account"
              value={formData.bank_account}
              onChange={handleChange}
              placeholder="Enter your bank account number"
              error={errors.bank_account}
            />

            <CommonInput
              label="IFSC Code"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="Enter your IFSC code"
              error={errors.ifsc}
            />

            <CommonInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              isPassword={true}
            />
            <div className="confirm-password">
              <CommonInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                isPassword={true}
              />
            </div>

            <PrimaryButton type="submit">Sign Up</PrimaryButton>

            <div className="signin-account">
              Already have an account?{" "}
              <span className="sign-in-link" onClick={handleNavigate}>
                Sign in
              </span>
            </div>
          </div>
        </form>
      </div>

      <div className="right-side">
        <img
          src={loginposter}
          className="login-poster"
          loading="lazy"
          decoding="async"
          alt="Cab booking"
        />
      </div>
    </div>
  );
};

export default DriverSignup;
