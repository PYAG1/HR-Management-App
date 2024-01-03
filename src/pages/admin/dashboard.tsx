import {useEffect}from 'react'

import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon,UserMinusIcon } from '@heroicons/react/24/outline'
import { BASE_URL } from '../../utils'
import { getTimeOfDay } from '../../utils/getTimeOfDay'
import { useQuery } from 'react-query'
import { GetStats } from '../../utils/adminActions'
import toast from 'react-hot-toast'





export default function Dashboard() {
const {isError,isFetching,isSuccess,data}= useQuery({queryKey:["get_stat"],queryFn:GetStats})
console.log(data);

useEffect(() => {
  if (isError) {
    toast.error("Could no get stats");
  }
}, [isError]);
const stats = [
  { id: 1, name: 'Total Employees', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'On Leave', stat: '58.16%', icon:UserMinusIcon , change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Vacancies', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
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
              <p className="text-2xl  text-white">{item.stat}</p>
   
              <div className="absolute inset-x-0 bottom-0 bg-lightbackground px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
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



