import React, { useState } from "react";
import CommonInput from "../../components/CommonInput";
import PrimaryButton from "../../components/PrimaryButton";
import { isValidEmail } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { loginposter } from "../../assets/images";
import { adminSignupApi } from "../../api/apiFunction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });

  const handleNavigate = () => {
    navigate("/signin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleValidate = () => {
  let valid = true;
  const newErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  };

  if (!formData.name.trim()) {
    newErrors.name = "Username field is required";
    valid = false;
    console.log("Name validation failed");
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email field is required";
    valid = false;
    console.log("Email is empty");
  } else if (!isValidEmail(formData.email)) {
    newErrors.email = "Invalid email format";
    valid = false;
    console.log("Email format invalid");
  }

  if (!formData.phone_number.trim()) {
    newErrors.phone_number = "Phone number is required";
    valid = false;
    console.log("Phone number is empty");
  } else if (!/^\d{10}$/.test(formData.phone_number)) {
    newErrors.phone_number = "Phone number must be 10 digits";
    valid = false;
    console.log("Phone number invalid format");
  }

  if (!formData.password) {
    newErrors.password = "Password field is required";
    valid = false;
    console.log("Password empty");
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
    valid = false;
    console.log("Password too short");
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password field is required";
    valid = false;
    console.log("Confirm Password empty");
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
    valid = false;
    console.log("Password mismatch");
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
    };

    try {
      const response = await adminSignupApi(payload);
      console.log("response", response);
      // Optional: check response format
      if (response?.data?.success) {
        toast.success("Signup successful! 🎉");
        // localStorage.setItem("authToken", response.token || "dummy-token");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userName", formData.name);
        navigate("/");
      } else {
        toast.error(response?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="signin_wrapper">
      <div className="left-side">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <h2>Welcome back</h2>
            <p>Please enter your details</p>

            <CommonInput
              label="Username"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your username"
              error={errors.name}
            />

            <CommonInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
            />

            <CommonInput
              label="Phone Number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              error={errors.phone_number}
            />

            <CommonInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
            />

            <CommonInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
            />

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

export default Signup;
