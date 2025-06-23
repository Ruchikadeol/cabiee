import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../components';


const LayoutAfterLogin = () => {
  return (
    <div className="layout-after-login">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAfterLogin;
