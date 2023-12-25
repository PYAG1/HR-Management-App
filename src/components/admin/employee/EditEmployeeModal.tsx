import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import TextField from "../../../core-ui/text-field";
import { useFormik } from "formik";
import * as Yup from "yup"

export default function EditEmployeeModal() {
  const [open, setOpen] = useState(false);
  const validationSchema= Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    departmentId: Yup.string().required('Department ID is required'),
    role: Yup.string().required('Role is required'),
    salary: Yup.number().required('Salary is required').positive('Salary must be a positive number'),
    gender: Yup.string().oneOf(['Male', 'Female'], 'Invalid gender').required('Gender is required'),
    contact: Yup.string().required('Contact number is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      gender: "",
      contact: "",
      role: '',
      salary: '',
      departmentId:""
   
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });


  return (
    <>
      <button
        type="button"
        onClick={()=> setOpen(true)}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full xl:w-8/12 h-[80vh] overflow-y-auto">
                  <div>
                    <div className=" ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 flex justify-between items-center w-full text-gray-900"
                      >
                        <div className="px-4 py-6 sm:px-6">
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
                      <div className="mt-2">
                        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                          <dl className=" divide-gray-100 p-4">
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 grid grid-cols-2" >
                           <TextField/>


                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                About
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                Fugiat ipsum ipsum deserunt culpa aute sint do
                                nostrud anim incididunt cillum culpa consequat.
                                Excepteur qui ipsum aliquip consequat sint. Sit
                                id mollit nulla mollit nostrud in ea officia
                                proident. Irure nostrud pariatur mollit ad
                                adipisicing reprehenderit deserunt qui eu.
                              </dd>
                            </div>
                          </dl>
                        </div>
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
