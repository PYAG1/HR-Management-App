import React from 'react'
import StackedHeader from '../../components/stackHeader'

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
  return (
    <div>
        <StackedHeader tabs={tabs}/>
    </div>
  )
}
