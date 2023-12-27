import React, { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TableComponentTypes{
    columnTitles:string[],
    renderBody:()=> ReactNode,
    loading:boolean,
    renderPagination?:()=> ReactNode
}

export default function TableComponent({
  columnTitles,
  renderBody,
  loading,
  renderPagination,
}: TableComponentTypes) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 h-full w-full">
      <div className="-mx-4 mt-8  shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columnTitles.map((item: string,index:any) => (
                <th
                key={index}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white w-full md:rounded-bl-lg ">
            {loading ? (
              <tr>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  <Skeleton />
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  <Skeleton />
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  <Skeleton />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  <Skeleton />
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Skeleton />
                </td>
              </tr>
            ) : (
              renderBody()
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
