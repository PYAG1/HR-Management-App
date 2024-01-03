import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { EmployeeData } from "../../../utils/adminActions";

export default function ViewEmployeeModal({data}:{data:EmployeeData}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Annotate</span>
        <EyeIcon className="h-4 w-4" aria-hidden="true" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full xl:w-7/12 h-max overflow-y-auto">
                  <div>
                    <div className=" ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 flex justify-between items-center w-full text-gray-900"
                      >
                        <div className="px-4 py-6 sm:px-6">
                          <h3 className="text-base font-semibold leading-7 text-gray-900">
                            Employee Information
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Personal details and application.
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
                          <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y divide-gray-100 p-4">
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Full name
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                               {data.firstname} {data.lastname}
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                            Role
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {data.role}
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email address
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {data.email}
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Salary expectation
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                               Ghc {data.salary}.00
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Contact
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                              {data.contact}
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Gender
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                              {data.gender}
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Department
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                              {data.gender}
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                               Leaves Days Left
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                              {data.leaveDaysRemaining}
                              </dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                               Status
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                               {
                                data.status === "Active" ? (      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                active
                              </span>): (      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                <svg className="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                Badge
                              </span>)
                               }
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
