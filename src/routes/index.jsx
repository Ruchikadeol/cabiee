import React from "react";
import { Routes, Route } from 'react-router-dom'
import { ROUTES_AFTER_LOGIN, ROUTES_BEFORE_LOGIN } from './routes'
import {
  ProtectedRouteForAfterLogin,
  ProtectedRouteForBeforeLogin
} from './routeFunction'
import LayoutAfterLogin from '../layout/LayoutAfterLogin'
import LayoutBeforeLogin from '../layout/LayoutBeforeLogin'

const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<LayoutBeforeLogin />}>
        {Object.values(ROUTES_BEFORE_LOGIN).map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<ProtectedRouteForBeforeLogin element={route.element} />}
          />
        ))}
      </Route>

      <Route element={<LayoutAfterLogin />}>
        {Object.values(ROUTES_AFTER_LOGIN).map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<ProtectedRouteForAfterLogin element={route.element} />}
          />
        ))}
      </Route>
    </Routes>
  )
}

export default RoutesComponent