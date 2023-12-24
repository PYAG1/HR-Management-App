import React from 'react'
import StackedHeader from '../../components/stackHeader'
import TableComponent from '../../components/TableComponent'
import { Popover, Transition } from '@headlessui/react'
import { ChatBubbleBottomCenterTextIcon, ChevronDownIcon, PaperClipIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import ViewEmployeeModal from '../../components/admin/employee/ViewEmployeeModal'

export default function Employees() {
    const tabs =[
     {
        name:"All",
        href:"#",
        current:true
     },
     {
        name:"On Leave",
        href:"#",
        current:false
     },
     {
        name:"Active",
        href:"#",
        current:false
     }

    ]

    
    const columnTitles = ["Name","Title","Email","Role"]
const people = [
   { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
   // More people...
]
  return (
    <div>
        <StackedHeader tabs={tabs}/>
        <div className=' w-full h-full'>
        <TableComponent loading={false} columnTitles={columnTitles} renderBody={()=>{return people.map((person) => (
   <tr key={person.email}>
     <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
       {person.name}
       <dl className="font-normal lg:hidden">
         <dt className="sr-only">Title</dt>
         <dd className="mt-1 truncate text-gray-700">{person.title}</dd>
         <dt className="sr-only sm:hidden">Email</dt>
         <dd className="mt-1 truncate text-gray-500 sm:hidden">{person.email}</dd>
       </dl>
     </td>
     <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.title}</td>
     <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.email}</td>
     <td className="px-3 py-4 text-sm text-gray-500">{person.role}</td>
     <td className="py-4 pl-3 pr-4 text-right text-sm font-medium  sm:pr-6">
     <MyPopover/>
    
     </td>
   </tr>
 ))}}/>


        </div>
    </div>
  )
}









  function MyPopover() {
  return (
   <div className="relative">
   <div className="absolute inset-0 flex items-center" aria-hidden="true">
     <div className="w-full border-t border-gray-300" />
   </div>
   <div className="relative flex justify-center">
     <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
       <button
         type="button"
         className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
       >
         <span className="sr-only">Edit</span>
         <PencilIcon className="h-4 w-4" aria-hidden="true" />
       </button>
     <ViewEmployeeModal/>
       <button
         type="button"
         className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
       >
         <span className="sr-only">Delete</span>
         <TrashIcon className="h-4 w-4" aria-hidden="true" />
       </button>
     </span>
   </div>
 </div>
  )
}
