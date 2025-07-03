import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CommonInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="common-input">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-field" style={{ position: "relative" }}>
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={error ? "error-input" : ""}
          style={{ paddingRight: isPassword ? "2.5rem" : undefined }}
        />

        {isPassword && (
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "0.6rem",
              top: "60%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#888",
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default CommonInput;
