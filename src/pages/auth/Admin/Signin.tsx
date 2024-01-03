import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import * as Y from "yup";
import TextField from "../../../core-ui/text-field";
import { adminSignInMutation } from "../../../utils/adminActions";


function AdminSignin() {
 
  const navigate = useNavigate();
 const {mutate:signIn,data,isError,isLoading,isSuccess,error} = useMutation({mutationFn:adminSignInMutation})

  const formik = useFormik({
    initialValues: { email: "", password: ""},
    validationSchema: Y.object().shape({
      email: Y.string().required("email is required"),
      password: Y.string().required("Password is required"),
      
    }),
    onSubmit: async (values) => {
 signIn(values)
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Signed In");
      localStorage.setItem("admin-token",data.data?.token)
      navigate("/admin/dashboard");
    }
    if (isError) {
      toast.error(`${error}`);
    }
  }, [isSuccess, isError]);
  return  (
    <div className="flex justify-between min-h-full   flex-1">
      <div className="flex flex-1 flex-col w-full h-screen  justify-center items-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 ">
          <div>
            <h1 className="text-left   text-primary font-semibold text-2xl mb-5">
              HR<span className=" text-background">Xpert</span><span className=" text-xs">ADMIN</span>
            </h1>
          </div>

          <div className="py-4">
            <div>
              <form
                onSubmit={formik.handleSubmit}
                action="#"
                method="POST"
                className="space-y-6 font-[Manrope]"
              >
                <TextField
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                  id="email"
                  {...formik}
                />
                <TextField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  {...formik}
                />

                <button
                  type="submit"
                  className="w-full font-[Manrope]  rounded-md bg-primary  py-3 text-sm font-semibold leading-6 text-background shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {isLoading ? <BeatLoader size={8} color={"black"} /> : "Sign in"}
                </button>
                <div className="flex items-center justify-end">
                  <div className="text-sm flex justify-between leading-6 w-full">
                  <button className="underline manrope text-[#4c4c4c]   hover:text-primary">
                      <Link to="/">Back to main</Link>
                    </button>
                    <button className="underline manrope text-[#4c4c4c]   hover:text-primary">
                      <Link to="/auth/admin/register">Dont have an account?</Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-16 lg:mt-0">
          <p className="font-manrope text-gray-500 text-sm text-center">
            All rights reserved, {new Date().getFullYear()}. Powered by PYAG & Frimps
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminSignin;
