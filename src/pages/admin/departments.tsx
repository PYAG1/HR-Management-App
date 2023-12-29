import React, { useEffect } from "react";
import CreateDepartmentButton from "../../components/admin/departments/CreateDepartmentButton";
import TableComponent from "../../components/TableComponent";
import { useQuery } from "react-query";
import { DepartmentsType, GetAllDepartments } from "../../utils/adminActions";
import toast from "react-hot-toast";

export default function Departments() {
  const {
    isLoading,
    isError,
  
    data: departmentData,
  } = useQuery({ queryKey: ["get_departments"], queryFn: GetAllDepartments });
  useEffect(() => {
    if (isError) {
      toast.error(`Error something occured.`);
    }
  }, [ isError]);
  return (
    <div className="w-full grid grid-cols-[400px,.7fr] gap-[10em] mt-10">
      <CreateDepartmentButton />
      <TableComponent
        columnTitles={["No.", "Department Name"]}
        renderBody={function (): React.ReactNode {
          return (
            <>
              {departmentData?.data?.data?.map(
                (item: DepartmentsType, index: number) => (
                  <tr key={index}>
                    <td className="hidden px-8 py-4 text-sm text-gray-500 sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {item.name}
                    </td>
                  </tr>
                )
              )}
            </>
          );
        }}
        loading={isLoading}
      />
    </div>
  );
}
