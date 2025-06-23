import { Navigate } from 'react-router-dom'

export const isSignin = () => {
  return localStorage.getItem('authToken') != null
  //return false;
}

export const ProtectedRouteForAfterLogin = ({
  element: Component,
  ...rest
}) => {
  return isSignin() ? <Component {...rest} /> : <Navigate to="/signin" replace />
}

export const ProtectedRouteForBeforeLogin = ({
  element: Component,
  ...rest
}) => {
  return !isSignin() ? <Component {...rest} /> : <Navigate to="/" replace />
}