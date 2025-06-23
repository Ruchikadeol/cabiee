import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutBeforeLogin = () => {
  return (
     <div className="layout-before-login">
   
      <Outlet />
    </div>
  )
}

export default LayoutBeforeLogin