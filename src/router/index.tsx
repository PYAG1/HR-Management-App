import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.layout";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import App from "../App";
import { default as MainApp } from "../pages/app/App";
export const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "register",
        element: <Signup />,
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
]);
