import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-4 h-screen w-full place-items-center">
      <p className="col-span-6">AuthLayout</p>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
