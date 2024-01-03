import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import TextField from "../../../core-ui/text-field";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../../../core-ui/custom-select";
import { EmployeeData, GetAllDepartments, editEmployeeInfoAdmin } from "../../../utils/adminActions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function EditEmployeeModal({data}:{data:EmployeeData}) {
  const {
    isLoading: loading,
    isError: Error,
    data: departmentData,
  } = useQuery({ queryKey: ["get_departments"], queryFn: GetAllDepartments });
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false);
  const validationSchema = Yup.object().shape({
    id:Yup.string().required("id is needled here"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    departmentId: Yup.string().required("Department ID is required"),
    role: Yup.string().required("Role is required"),
    salary: Yup.number()
      .required("Salary is required")
      .positive("Salary must be a positive number"),
    contact: Yup.string().required("Contact number is required"),
  });
  const {isLoading,isError,isSuccess,mutate,error } = useMutation({mutationFn:editEmployeeInfoAdmin,onSuccess:()=>{
    queryClient.invalidateQueries(["get_allEmployees"]);
  }})
  const formik = useFormik({
    initialValues: {
      id:data?.id,
      email: data?.email,
      firstname: data?.firstname,
      lastname: data?.lastname,
      contact: data?.contact,
      role: data?.role,
      salary: data?.salary,
      departmentId: data?.departmentId,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
 mutate(values)
 setOpen(false)
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Employee data updated successfulyy");
    }
    if (isError) {
      toast.error(`${error}`);
    }
  }, [isSuccess, isError]);


  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Edit</span>
        <PencilIcon className="h-4 w-4" aria-hidden="true" />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full xl:w-8/12 h-max overflow-y-auto">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 flex justify-between items-center w-full text-gray-900"
                    >
                      <div className="px-4 py-2 sm:px-6">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          Edit Employee Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                          Edit Employee details
                        </p>
                      </div>
                      <button
                        title="close"
                        type="button"
                        className=" w-6 h-6"
                        onClick={() => setOpen(false)}
                      >
                        <XMarkIcon />
                      </button>
                    </Dialog.Title>
                    <div className="">
                      <div className="overflow-hidden bg-white sm:rounded-lg overflow-y-auto h-[55vh]">
                        <dl className=" p-3">
                          <div className=" px-4 py-2 sm:col-span-1 sm:px-0 grid grid-cols-2 gap-5">
                            <TextField
                              type={"text"}
                              id={"firstname"}
                              placeholder={"Enter Firstname"}
                              label={"Firstname"}
                              {...formik}
                            />
                            <TextField
                              type={"text"}
                              id={"lastname"}
                              placeholder={"Enter Lastname"}
                              label={"Lastname"}
                              {...formik}
                            />
                            <TextField
                              type={"email"}
                              id={"email"}
                              placeholder={"Enter Email"}
                              label={"Email"}
                              {...formik}
                            />
                            <TextField
                              type={"text"}
                              id={"contact"}
                              placeholder={"Enter Contact"}
                              label={"Contact"}
                              {...formik}
                            />
                            <TextField
                              id="role"
                              placeholder="Enter assigned role"
                              label="Role"
                              type="text"
                              {...formik}
                            />
                            <TextField
                              id="salary"
                              placeholder="Enter gross salary"
                              label="Salary(Ghc)"
                              type="number"
                              {...formik}
                            />
                          </div>
                          <div className="border-t border-gray-100 px-2 py-2 sm:col-span-2 sm:px-0">
                            <CustomSelect
                            options={
                              loading
                                ? [{ id: "loading", name: "Loading..." }]
                                : Error
                                ? [{ id: "error", name: "Failed to Fetch" }]
                                : departmentData?.data?.data || []
                            }
                              id={"departmentId"}
                              label={"Department"}
                              {...formik}
                            />
                          </div>
                        </dl>
                      </div>
                      <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 right-2 w-full ">
                        <button
                          type="button"
                          className={`inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm `}
                          onClick={() => formik.handleSubmit()}
                         
                        >
                             {isLoading ? (
                          <ClipLoader size={20} color="white" />
                        ) : (
                          "Submit"
                        )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
