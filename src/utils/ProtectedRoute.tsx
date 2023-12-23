import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}:{children:ReactNode}) {
   
    const token = "ihih"
    if(!token)   return <Navigate to="/" replace />;
  return  children
}
