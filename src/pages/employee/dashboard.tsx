import { CalendarDaysIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon, CursorArrowRaysIcon, UserMinusIcon, UsersIcon } from "@heroicons/react/24/solid";
import React from "react";


export default function Emdashboard() {
  const stats = [
    { id: 1, name: 'Leave Days Remaining', stat: '71,897', icon: CalendarDaysIcon },
    { id: 2, name: 'Leaves Accepted', stat: '58.16%', icon:CheckIcon  },
    { id: 3, name: 'Leaves Rejected', stat: '24.57%', icon:XMarkIcon },
  ]
  const firstName = "Papa";
  const status = "active";
  return (
    <div className="w-full max-h-[90svh]">
      <div className=" w-full text-white bg-background h-max   rounded-xl p-5 font-[Manrope]">
        <div className="flex w-full gap-5 items-center">
          <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <div className=" space-y-2">
            <p className=" md:text-3xl   font-medium ">
              Good Morning, {firstName}
            </p>{" "}
            <div>
              {status === "active" ? (
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  <svg
                    className="h-1.5 w-1.5 fill-green-500"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  Active
                </span>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
        
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 my-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-lightbackground px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-[#4b5068] p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl  text-white">{item.stat}</p>
   
              <div className="absolute inset-x-0 bottom-0 bg-lightbackground px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
      </div>

     
    </div>
  );
}
