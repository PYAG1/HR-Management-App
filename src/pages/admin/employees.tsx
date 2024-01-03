import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import TableComponent from "../../components/TableComponent";
import DeleteEmployee from "../../components/admin/employee/DeleteEmployeeModal";
import EditEmployeeModal from "../../components/admin/employee/EditEmployeeModal";
import ViewEmployeeModal from "../../components/admin/employee/ViewEmployeeModal";
import CreateEmployeeButton from "../../components/admin/employee/createEmployeeButton";
import StackedHeader from "../../components/stackHeader";
import { EmployeeData, GetAllEmploees } from "../../utils/adminActions";

export default function Employees() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const columnTitles = ["Name", "Email", "Role", "Status"];

  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const {
    isLoading,
    isError,
    data: allEmployees,
    isFetching
  } = useQuery({ queryKey: ["get_allEmployees",2], queryFn: GetAllEmploees,keepPreviousData : true });
  const filteredEmployees = allEmployees?.data?.data?.filter(
    (person: EmployeeData) => {
      const fullName = `${person?.firstname} ${person?.lastname}`;

      if (!status && !search) {
        return true;
      }

      if (status && person.status !== status) {
        return false;
      }

      if (search && !fullName.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      return true;
    }
  );

  const tabs = [
    {
      name: "All",
      href: "#",
      current: !status,
      count: allEmployees?.data?.data.length,
    },
    {
      name: "On Leave",
      href: `?status=On Leave`,
      current: status === "On Leave",
      count: allEmployees?.data?.data.filter(
        (item: EmployeeData) => item.status === "On Leave"
      ).length,
    },
    {
      name: "Active",
      href: `?status=Active`,
      current: status === "Active",
      count: allEmployees?.data?.data.filter(
        (item: EmployeeData) => item.status === "Active"
      ).length,
    },
  ];
  useEffect(() => {
    if (isError) {
      toast.error(`${allEmployees?.data?.message}`);
    }
  }, [isError]);
  return (
    <div>
      <StackedHeader
        tabs={tabs}
        renderButton={() => <CreateEmployeeButton />}
      />
      <div className=" w-full h-full">
        <SearchInput search={search} setSearch={setSearch} />

        <TableComponent
  loading={isLoading || isFetching}
  columnTitles={columnTitles}
  renderBody={() => {
    return (filteredEmployees?.slice(0, limit) || []).map((person: EmployeeData) => (
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
          {person.status === "Active" ? (
            <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              <svg
                className="h-1.5 w-1.5 fill-green-500"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              active
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
              On Leave
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
                <EditEmployeeModal data={person} />
                <ViewEmployeeModal data={person} />
                <DeleteEmployee id={person.id} />
              </span>
            </div>
          </div>
        </td>
      </tr>
    ));
  }}
  total={filteredEmployees?.length || 0}
  renderPagination={()=>{
    return ( <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">20</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </a>
      </div>
    </nav>)
  }}
/>

      </div>
    </div>
  );
}
