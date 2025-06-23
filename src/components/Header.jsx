import React, { useState, useEffect } from "react";
import { Menu, Logout } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { ROLE_ACCESS } from "../constant/UserRole";
import { ICONS } from "../constant/SidebarConfig";
import "../assets/scss/page/header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  const userRole = localStorage.getItem("userRole") || "ADMIN";
  const accessibleItems = ROLE_ACCESS[userRole] || [];

  const handleResize = () => setIsMobile(window.innerWidth < 700);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header-left">Cabiee Portal</div>

      <div className="header-right">
        {isMobile ? (
          <>
            <Menu
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: "pointer", color: "white" }}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                {accessibleItems.map((item) => (
                  <NavLink
                    key={item}
                    to={`/${item}`}
                    className={({ isActive }) =>
                      `dropdown-link ${isActive ? "active" : ""}`
                    }
                    onClick={() => setShowDropdown(false)}
                  >
                    {ICONS[item] || "📁"}
                    <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  </NavLink>
                ))}
                <button className="dropdown-link logout" onClick={handleLogout}>
                  <Logout />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
