import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({children}:{children:ReactNode}) {
  const AdminToken = localStorage.getItem("admin-token") 
        
  const EmployeeToken = localStorage.getItem("employee-token")
    if(!AdminToken || !EmployeeToken)   return <Navigate to="/" replace />;
  return  children
}
