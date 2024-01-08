import { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import StackedHeader from "../../components/stackHeader";

import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import AcceptLeave from "../../components/admin/leaves/AcceptLeave";
import RejectLeave from "../../components/admin/leaves/RejectLeave";
import ViewAllLeavesModal from "../../components/admin/leaves/ViewAllLeaves";
import { GetAllLeaveHistory } from "../../utils/adminActions";
import { LeaveType } from "../../utils/employeeActions";

export default function Leaves() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const {
    isLoading,
    isError,
    isFetching,
    data: AllLeaveHistory,
  } = useQuery({
    queryKey: ["getAllEmpLeaveHistory"],
    queryFn: GetAllLeaveHistory,
  });
  const tabs = [
    {
      name: "All",
      href: "#",
      current: !status,
      count: AllLeaveHistory?.data?.data?.length,
    },
    {
      name: "Approved",
      href: "?status=Approved",
      current: status === "Approved",
      count: AllLeaveHistory?.data?.data.filter(
        (item: LeaveType) => item.status === "Approved"
      ).length,
    },
    {
      name: "Pending",
      href: "?status=Pending",
      current: status === "Pending",
      count: AllLeaveHistory?.data?.data.filter(
        (item: LeaveType) => item.status === "Pending"
      ).length,
    },
    {
      name: "Rejected",
      href: "?status=Rejected",
      current: status === "Rejected",
      count: AllLeaveHistory?.data?.data.filter(
        (item: LeaveType) => item.status === "Rejected"
      ).length,
    },
  ];

  const columnTitles = ["Name", "Duration", "Leave Type", "Status"];
  const [search,setSearch] = useState<string>("")
  const filteredLeaves = AllLeaveHistory?.data?.data?.filter((leave: LeaveType) => {
    const fullName = `${leave?.employee?.firstname} ${leave?.employee?.lastname}`;
  
    if (!status && !search) {
      return true;
    }
  
    if (status && leave.status !== status) {
      return false;
    }
  
    if (search && !fullName.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
  
    return true;
  });
  

  useEffect(() => {
    if (isError) {
      toast.error(`${AllLeaveHistory?.data?.message}`);
    }
  }, [isError]);
  return (
    <div>
      <StackedHeader tabs={tabs} />
      <div className=" w-full h-full">
        <p className=" text-xl font-medium my-3">History</p>

        <SearchInput search={search} setSearch={setSearch}/>
        <TableComponent
          loading={isLoading || isFetching}
          columnTitles={columnTitles}
          renderBody={() => {
            return filteredLeaves?.map((leave: LeaveType) => (
              <tr key={leave.id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {leave?.employee?.firstname}
                  <br></br> {leave?.employee?.lastname}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {leave?.employee?.firstname} {leave?.employee?.lastname}
                    </dd>
                    <dt className="sr-only sm:hidden">Duration</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {leave.duration}
                    </dd>
                  </dl>
                </td>
                <td className="hidden pl-6 py-4 text-sm text-gray-500 lg:table-cell">
                  {leave.duration}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {leave.leaveType}
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
                        <AcceptLeave id={leave?.id} />
                        <RejectLeave id={leave?.id} />
                        <ViewAllLeavesModal data={leave} />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ));
          } } total={filteredLeaves?.length || 0}        />
      </div>
    </div>
  );
}
