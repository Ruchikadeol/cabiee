import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CommonInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="common-input">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-password-wrapper">
        <input
          type={inputType}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "error-input" : ""}
        />
        {isPassword && (
          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        )}
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default CommonInput;
