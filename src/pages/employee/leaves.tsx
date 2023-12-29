import React, { useEffect } from "react";
import StackedHeader from "../../components/stackHeader";
import TableComponent from "../../components/TableComponent";
import { Popover, Transition } from "@headlessui/react";
import {
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { CheckCircleIcon, EyeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import ViewEmployeeModal from "../../components/admin/employee/ViewEmployeeModal";
import DeleteEmployee from "../../components/admin/employee/DeleteEmployeeModal";
import CreateEmployeeButton from "../../components/admin/employee/createEmployeeButton";
import CreateLeaveButton from "../../components/employee/leaves/createLeaveButton";
import LeaveDetailsModal from "../../components/employee/leaves/ViewLeaveModal";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { LeaveType, getEmpLeaveHistory } from "../../utils/employeeActions";
import { formatDate } from "../../utils";
import { useLocation } from "react-router-dom";

export default function EmLeaves() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const {
    isLoading,
    isError,
    isSuccess,
    data: LeaveHistory,
  } = useQuery({queryKey:["getEmpLeaveHistory"], queryFn: getEmpLeaveHistory });
  const tabs = [
    {
      name: "All",
      href: "#",
      current: !status,
      count: LeaveHistory?.data?.data?.length,
    },
    {
      name: "Approved",
      href: "?status=Approved",
      current: status === "Approved",
      count: LeaveHistory?.data?.data.filter(
        (item: LeaveType) => item.status === "Approved"
      ).length,
    },
    {
      name: "Pending",
      href: "?status=Pending",
      current: status === "Pending",
      count: LeaveHistory?.data?.data.filter(
        (item: LeaveType) => item.status === "Pending"
      ).length,
    },
    {
      name: "Rejected",
      href: "?status=Rejected",
      current: status === "Rejected",
      count: LeaveHistory?.data?.data.filter(
        (item: LeaveType) => item.status === "Rejected"
      ).length,
    },
  ];

  const columnTitles = ["Start Date", "End Date", "Duration", "Status"];
  const filteredLeaves = LeaveHistory?.data?.data?.filter(
    (leave: LeaveType) => {
      if (!status) {
        return true;
      }
      return leave.status === status;
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error(`${LeaveHistory?.data?.message}`);
    }
  }, [isError]);
  return (
    <div>
      <StackedHeader tabs={tabs} renderButton={() => <CreateLeaveButton />} />
      <div className=" w-full h-full">
        <p className=" text-xl font-medium my-3">History</p>
        <TableComponent
          loading={isLoading}
          columnTitles={columnTitles}
          renderBody={() => {
            return filteredLeaves.map((leave: LeaveType) => (
              <tr key={leave.id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {formatDate(leave.startDate)}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Start Date</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {formatDate(leave.startDate)}
                    </dd>
                    <dt className="sr-only sm:hidden">EndDate</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {formatDate(leave.endDate)}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {formatDate(leave.endDate)}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {leave.duration}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {leave.status === "Pending" ? (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      <svg
                        className="h-1.5 w-1.5 fill-yellow-500"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                      Pending
                    </span>
                  ) : leave.status === "Approved" ? (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      <svg
                        className="h-1.5 w-1.5 fill-green-500"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                      <svg
                        className="h-1.5 w-1.5 fill-red-500"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                      Rejected
                    </span>
                  )}
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
                        <LeaveDetailsModal data={leave} />
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
