import {
  Home,
  Employees,
  Signin,
  Signup,
  DriverSignup,
  Groups,
  Organisation,
  Tenders,
} from "../pages";
export const ROUTES_BEFORE_LOGIN = {
  SIGNIN: {
    path: "/signin",
    element: Signin,
    key: "signin",
  },

  SIGNUP: {
    path: "/signup",
    element: Signup,
    key: "signup",
  },

  DRIVERSIGNUP: {
    path: "/driver/signup",
    element: DriverSignup,
    key: "driversignup",
  },

  NOT_FOUND: {
    path: "*",
    element: Signin,
    key: "not_found",
  },
};

export const ROUTES_AFTER_LOGIN = {
  DEFAULT: {
    path: "/",
    element: Home,
    key: "default_home",
  },
  HOME: {
    path: "/dashboard",
    element: Home,
    key: "home",
  },
  EMPLOYEES: {
    path: "/employees",
    element: Employees,
    key: "employees",
  },
  GROUPS: {
    path: "/groups",
    element: Groups,
    key: "groups",
  },
  ORGANISATION: {
    path: "/organisation",
    element: Organisation,
    key: "organisation",
  },
  TENDERS: {
    path: "/tenders",
    element: Tenders,
    key: "tenders",
  },
  NOT_FOUND: {
    path: "*",
    element: Home,
    key: "not_found",
  },
};
