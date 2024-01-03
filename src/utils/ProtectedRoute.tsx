import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({children,user,redirectPath}:{children:ReactNode,user:any,redirectPath:string}) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
