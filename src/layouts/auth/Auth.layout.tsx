import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="grid gap-4 h-screen w-full place-items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
