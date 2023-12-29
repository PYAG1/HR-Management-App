import { Fragment, useRef, useState,useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import {
  ExclamationTriangleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useMutation,useQueryClient } from "react-query";
import { manageLeave } from "../../../utils/adminActions";
import { ClipLoader } from "react-spinners";

export default function AcceptLeave({id}:{id:string| undefined}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const cancelButtonRef = useRef(null);
  const {isLoading,isSuccess,mutate,isError,error}= useMutation({mutationFn:manageLeave,onSuccess:()=>{
    queryClient.invalidateQueries("getAllEmpLeaveHistory")
  }})

  useEffect(() => {
    if (isSuccess) {
      toast.success("Leave request approved");
    }
    if (isError) {
      toast.error(`Failed to approve :${error}`);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Approve</span>
        <CheckBadgeIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-medium leading-6 text-gray-900"
                      >
                        Approve employee leave request
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm  text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() =>{ 
                        mutate({id:id,approved:true})
                    setOpen(false)
                    }}
                    >
                            {isLoading ? (
                          <ClipLoader size={20} color="white" />
                        ) : (
                          "Approve"
                        )}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
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
