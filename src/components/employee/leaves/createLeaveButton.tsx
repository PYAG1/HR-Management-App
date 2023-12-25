import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import TextField from "../../../core-ui/text-field";
import * as Yup from "yup";
import CustomSelect from "../../../core-ui/custom-select";
import TextAreaField from "../../../core-ui/text-area";

const steps = [
  { id: "01", name: "Applicant details", href: "#", status: "current" },
  { id: "02", name: "Preview", href: "#", status: "upcoming" },
];

function Steps({ currentStep }: {currentStep: number }) {
  const stackHeaders = steps.map((step, index) => ({
    id: step.id,
    name: step.name,
    status:
      index === currentStep
        ? "current"
        : index < currentStep
        ? "complete"
        : "upcoming",
  }));
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {stackHeaders.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === "complete" ? (
              <div className="group flex flex-row gap-1 border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : step.status === "current" ? (
              <div
                className="flex flex-row gap-1  border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                <span className="text-sm font-medium text-indigo-600">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group flex flex-row gap-1  border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function CreateLeaveButton() {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  const validationSchemaStep0 = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    departmentId: Yup.string().required('Department ID is required'),
    role: Yup.string().required('Role is required'),
    salary: Yup.number().required('Salary is required').positive('Salary must be a positive number'),
    gender: Yup.string().oneOf(['Male', 'Female'], 'Invalid gender').required('Gender is required'),
    contact: Yup.string().required('Contact number is required'),
  });

  const formikStep0 = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      leaveType: "",
      reason: "",
   
      
    },
    validationSchema: validationSchemaStep0,
    onSubmit: (values) => {
      console.log(values);
    },
  });



  const renderData = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="w-full space-y-4 gap-5">

            <CustomSelect
              options={[
                { id: "BEAVEMENT", name: "Bereavement" },
                { id: "SICK", name: "Sick" },
                { id: "CASUAL", name: "Casual" },
              ]}
              id={"leaveType"}
              label={"Leave Type"}
              {...formikStep0}
            />
            <div className=" w-full grid grid-cols-2 gap-5 ">
            <div className=" w-full flex flex-col gap-3 lg:gap-2">
                  <label htmlFor="startDate" className=" text-base">
                    Start Date
                  </label>
                  <input
                    name="startDate"
                    type="date"
                    value={formikStep0.values.startDate}
                    onChange={formikStep0.handleChange}
                    className=" min-w-[80px] outline-none border-[#000]/25 border-[1px] px-3 py-1 rounded focus:border-[#AFDBF5]     text-black"
                  />
                  {formikStep0.errors.startDate && (
                    <p className="text-[#EF0107] font-[300] text-[0.8rem]">
                      *{formikStep0.errors.startDate}
                    </p>
                  )}
                </div>
                <div className=" w-full flex flex-col gap-3 lg:gap-2">
                  <label htmlFor="endDate" className=" text-base">
                    End Date
                  </label>
                  <input
                    name="endDate"
                    type="date"
                    value={formikStep0.values.endDate}
                    onChange={formikStep0.handleChange}
                    className=" min-w-[80px] outline-none border-[#000]/25 border-[1px] px-3 py-1 rounded focus:border-[#AFDBF5]     text-black"
                  />
                  {formikStep0.errors.endDate && (
                    <p className="text-[#EF0107] font-[300] text-[0.8rem]">
                      *{formikStep0.errors.endDate}
                    </p>
                  )}
                </div>
            </div>
            <TextAreaField
             id="reason"
             placeholder="Enter your reason to request a leave"
             label="Reason"
            
            {...formikStep0}
            />
          </div>
        );


      case 1:
        return (
          <div>
            <p>Step 2 content goes here</p>
          </div>
        );

      default:
        return null; // Handle invalid step number
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ml-3 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Request Leave
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

          <div className="fixed inset-0 z-10 overflow-y-auto">
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full xl:w-5/12  min-h-[80vh]">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 flex justify-between items-center w-full text-gray-900"
                        >
                         Request for a leave
                          <button
                            title="close"
                            type="button"
                            className=" w-6 h-6"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            <XMarkIcon />
                          </button>
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                       Fill in the neccessary data to request for a leave
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full px-10 flex gap-5 flex-col ">
                    <Steps currentStep={currentStep} />
                    <div>{renderData()}</div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 absolute bottom-0 right-0">
                 {
                  currentStep === 1 ? (   <button
                    type="button"
                    
                    className={`inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${!formikStep0.isValid ||  !formikStep0.dirty ? "cursor-not-allowed ":"" }`}
                    onClick={() => nextStep()}
                    disabled={!formikStep0.isValid || !formikStep0.dirty}
                  >
                 Submit
                  </button>):(   <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => nextStep()}
                   
                    >
                      Next
                    </button>)
                 }
                    <button
                      type="button"
                      className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                        currentStep === 0 ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() => prevStep()}
                      disabled={currentStep === 0}
                    >
                      Back
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
