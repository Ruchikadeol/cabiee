import React, { useState } from "react";
import CommonInput from "../../components/CommonInput";
import PrimaryButton from "../../components/PrimaryButton";
import { isValidEmail } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { loginposter } from "../../assets/images";
import { logInApi } from "../../api/apiFunction";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleNavigate = () => {
    navigate("/signup");
  };

  const handleDriverNavigate = () => {
    navigate("/driver/signup");
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
      email: "",
      password: "",
    };

    if (formData.email.trim() === "") {
      newErrors.email = "Email field is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password field is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidate()) return;
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const result = await logInApi(payload);
      const userData = result?.data?.data;

      localStorage.setItem("authToken", userData?.tokens?.access);
      localStorage.setItem("refreshToken", userData?.tokens?.refresh);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userRole", userData?.user?.role);
      localStorage.setItem(
        "organisationExists",
        userData?.admin?.organisation ? "true" : "false"
      );
      // Redirect based on organisation presence
      if (userData?.user?.role === "admin" && !userData?.admin?.organisation) {
        navigate("/organisation");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.warn("Error in fetching", error);
    }
  };
  return (
    <div className="signin_wrapper">
      <div className="left-side">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper signin">
            <h2>Welcome back</h2>
            <p>Please enter your details</p>

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
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
            />

            <PrimaryButton type="submit">Sign In</PrimaryButton>

            <div className="signup-account">
              Want to drive with us and become a cab partner?{" "}
              <span className="sign-up-link" onClick={handleDriverNavigate}>
                Register as Driver
              </span>
            </div>

            <div className="signup-account">
              Looking to manage your organization’s employee transport?{" "}
              <span className="sign-up-link" onClick={handleNavigate}>
                Create an Admin Account
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
          alt="Cab Pickup"
        />
      </div>
    </div>
  );
};

export default Signin;
