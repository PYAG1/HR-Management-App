import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminToken } from './adminActions';
import { EmployeeToken } from './employeeActions';

export default function ProtectedRoute({children}:{children:ReactNode}) {
   AdminToken
   EmployeeToken
    if(!AdminToken || !EmployeeToken)   return <Navigate to="/" replace />;
  return  children
}
