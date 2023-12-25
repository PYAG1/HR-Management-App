import React from "react";
import CreateDepartmentButton from "../../components/admin/departments/CreateDepartmentButton";
import TableComponent from "../../components/TableComponent";

export default function Departments() {
  return (
    <div className="w-full grid grid-cols-[400px,.7fr] gap-[10em] mt-10">
      <CreateDepartmentButton />
      <TableComponent
        columnTitles={["No.", "Department Name"]}
        renderBody={function (): React.ReactNode {
          return (
            <tr>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {1}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">Finance</td>
            </tr>
          );
        }}
        loading={false}
      />
    </div>
  );
}
