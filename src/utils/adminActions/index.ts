import axios from "axios"
import toast from "react-hot-toast"
import { BASE_URL } from "..";
import { useNavigate } from "react-router-dom";


const AdminToken = localStorage.getItem("admin-token")

interface SignUpValues {
    email: string;
    password: string;
    companyCapacity: string;
  }

  interface SigninValues{
    email: string;
    password: string;
  }


  export type EmployeeData = {
    id?:string
    email: string;
    firstname: string;
    lastname: string;
    gender: string;
    contact: string;
    role: string;
    salary: string; // You might want to change this to a numeric type if salary is a number
    departmentId: string;
    status?:string;
    leaveDaysRemaining?:number
  };

 export  interface DepartmentsType{
    id: string;
    name: string;
    managerId: string;
  }
  

export const signUpMutation = (data:SignUpValues) => {
    return axios.post(`${BASE_URL}/api/admin/register`, data)
}
export const adminSignInMutation= (data:SigninValues)=>{
    return axios.post(`${BASE_URL}/api/admin/login`, data)
}

export const CreateEmployeeMutation= (data:EmployeeData)=>{
  return axios.post(`${BASE_URL}/api/employee/register`, data,{headers:{
    'Authorization': `Bearer ${AdminToken}`
  }})
}

export const DeleteEmployeeMutation= (data:string| undefined)=>{
  return axios.delete(`${BASE_URL}/employees/left?id=${data}`,{headers:{
    'Authorization': `Bearer ${AdminToken}`
  }})
}

export const CreateDepartment=(data:any)=>{
  return axios.post(`${BASE_URL}/api/department/create`,data,{headers:{
    'Authorization': `Bearer ${AdminToken}`
  }})
}



//QUERIES
export const GetAllDepartments=()=>{
  return axios.get(`${BASE_URL}/api/department/all`,{headers:{
    'Authorization': `Bearer ${AdminToken}`
  }})
}
export const GetAllEmploees=()=>{
  return axios.get(`${BASE_URL}/employees/all`,{headers:{
    'Authorization': `Bearer ${AdminToken}`
  }})
}