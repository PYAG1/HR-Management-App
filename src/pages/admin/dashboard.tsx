import { useEffect } from 'react'

import { CursorArrowRaysIcon, UserMinusIcon, UsersIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Link } from "react-router-dom"
import { PuffLoader } from "react-spinners"
import { GetStats } from '../../utils/adminActions'
import { getTimeOfDay } from '../../utils/getTimeOfDay'




export default function Dashboard() {
const {isError,data,isLoading}= useQuery({queryKey:["get_stat"],queryFn:GetStats})


useEffect(() => {
  if (isError) {
    toast.error("Could not get stats");
  }
}, [isError]);
const stats = [
  { id: 1, name: 'Total Employees', stat:data?.data?.data?.totalnumber, icon: UsersIcon, changeType: 'increase',link:"/admin/employees" },
  { id: 2, name: 'Active', stat:data?.data?.data?.totalactive, icon: CursorArrowRaysIcon , change: '5.4%', changeType: 'increase',link:"/admin/employees" },
  { id: 3, name: 'On Leave', stat: data?.data?.data?.totalonleave, icon:  UserMinusIcon, change: '3.2%', changeType: 'decrease',link:"/admin/leaves" },
]

  return (
    <div className='w-full max-h-[90svh]'>
        <div className=' w-full text-white bg-background h-[45vh]  rounded-xl p-5 font-[Manrope]'>
            <p className=' md:text-3xl   font-medium '>Good {getTimeOfDay()}, Admin</p>
            <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Last 30 days</h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="text-2xl  text-white">         {isLoading ? (
                    <PuffLoader size={40} color="white" />
                  ) : (
                    item.stat
                  )}</p>
   
              <div className="absolute inset-x-0 bottom-0 bg-lightbackground px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to={item.link} className="font-medium text-indigo-600 hover:text-indigo-500">
                 
                    View all<span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>

        </div>


    </div>
  )
}



