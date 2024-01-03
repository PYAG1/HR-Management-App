import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function LogoutNotification({
  show,
  setShow,
  name,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  name: string | null;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <InformationCircleIcon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Are you sure you want to log out
                    </p>
                    <div className="mt-4 flex">
                      <button
                        type="button"
                        onClick={()=>{
                            localStorage.removeItem("admin-token")
                            localStorage.removeItem("employee-token")
                            setShow(false)
                            navigate("/")
                        }}
                        className="inline-flex items-center rounded-md bg-primary px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                            setShow(false);
                          }}
                        className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                    No
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
