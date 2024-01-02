import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function SearchInput({search,setSearch}:{search:string,setSearch:React.Dispatch<React.SetStateAction<string>>}) {
 

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8 relative w-[350px]">
    <label htmlFor="account-number" className="block text-sm font-medium leading-6 text-gray-900">
     Search by Name
    </label>
    <div className="relative mt-2 rounded-md shadow-sm flex items-center">
      <input
        type="text"
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
        name="account-number"
        id="account-number"
        className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="John Doe"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  </div>
  )
}
