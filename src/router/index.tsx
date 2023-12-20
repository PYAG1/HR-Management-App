import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.layout";
import App from "../App";
import { default as MainApp } from "../pages/app/App";
import AdminSignin from "../pages/auth/Admin/Signin";
import AdminSignup from "../pages/auth/Admin/Signup";
import EmployeeSignin from "../pages/auth/Employee/Signin";
import AdminLayout from "../layouts/dashboard/Adminlayout";
import Dashboard from "../pages/admin/dashboard";
import Employees from "../pages/admin/employees";
import Departments from "../pages/admin/departments";
import Leaves from "../pages/admin/leaves";
export const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "admin/login",
        element: <AdminSignin/>,
      },
      {
        path: "admin/register",
        element: <AdminSignup/>,
      },
      {
        path: "employee/login",
        element: <EmployeeSignin/>,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <MainApp />,
  },

  {
    path: "/admin/",
    element: <AdminLayout/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>,
      },
      {
        path: "employees",
        element:<Employees/>,
      },
      {
        path: "departments",
        element: <Departments/>,
      },
      {
        path: "leaves",
        element: <Leaves/>,
      },
    ],
  },
]);
