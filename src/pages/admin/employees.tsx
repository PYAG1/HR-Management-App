import React, { useState } from "react";
import StackedHeader from "../../components/stackHeader";
import TableComponent from "../../components/TableComponent";
import { Popover, Transition } from "@headlessui/react";
import {
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import ViewEmployeeModal from "../../components/admin/employee/ViewEmployeeModal";
import DeleteEmployee from "../../components/admin/employee/DeleteEmployeeModal";
import CreateEmployeeButton from "../../components/admin/employee/createEmployeeButton";
import EditEmployeeModal from "../../components/admin/employee/EditEmployeeModal";
import { useQuery } from "react-query";
import { EmployeeData, GetAllEmploees } from "../../utils/adminActions";
import { useLocation } from "react-router-dom";

export default function Employees() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  
  const columnTitles = ["Name", "Email", "Role", "Status"];


  const {
    isLoading,
    isError,
    data: allEmployees,
  } = useQuery({ queryKey: ["get_allEmployees"], queryFn: GetAllEmploees});
  const filteredEmployees = allEmployees?.data?.data?.filter((person: EmployeeData) => {
    if (!status) {
      return true;
    }
    return person.status === status;
  });
  const tabs = [
    {
      name: "All",
      href: "#",
      current: !status, 
      count:allEmployees?.data?.data.length
    },
    {
      name: "On Leave",
      href: `?status=On Leave`,
      current: status === "On Leave",
      count:allEmployees?.data?.data.filter((item:EmployeeData)=>item.status === "On Leave").length
    },
    {
      name: "Active",
      href: `?status=Active`,
      current: status === "Active",
      count:allEmployees?.data?.data.filter((item:EmployeeData)=>item.status === "Active").length
    },
  ];


  return (
    <div>
      <StackedHeader
        tabs={tabs}
        renderButton={() => <CreateEmployeeButton />}
      />
      <div className=" w-full h-full">
        <TableComponent
          loading={isLoading}
          columnTitles={columnTitles}
          renderBody={() => {
            return filteredEmployees.map((person: EmployeeData) => (
              <tr key={person.email}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 ">
                  {person.firstname} {person.lastname}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {person.gender}
                    </dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {person.email}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.email}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {person.role}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {person.status === "Active" ? (      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
          <circle cx={3} cy={3} r={3} />
        </svg>
        active
      </span>): (      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
        <svg className="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
          <circle cx={3} cy={3} r={3} />
        </svg>
        Badge
      </span>)}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium  sm:pr-6">
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <EditEmployeeModal/>
                        <ViewEmployeeModal data={person} />
                        <DeleteEmployee id={person.id}  />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ));
          }}
        />
      </div>
    </div>
  );
}
