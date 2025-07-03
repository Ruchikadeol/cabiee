// src/pages/Home.jsx
import React from "react";
import AdminHome from "./admin/adminhome";
import DriverHome from "./driver/driverhome";

const Home = () => {
  const userRole = localStorage.getItem("userRole");

  if (userRole === "driver") return <DriverHome />;
  if (userRole === "admin") return <AdminHome />;
};

export default Home;
