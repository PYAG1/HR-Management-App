import axios from "axios"
import toast from "react-hot-toast"
import { BASE_URL } from "..";
import { useNavigate } from "react-router-dom";

interface SignUpValues {
    email: string;
    password: string;
    companyCapacity: string;
  }

  interface SigninValues{
    email: string;
    password: string;
  }


  type EmployeeData = {
    email: string;
    firstname: string;
    lastname: string;
    gender: string;
    contact: string;
    role: string;
    salary: string; // You might want to change this to a numeric type if salary is a number
    departmentId: string;
  };
  

export const signUpMutation = (data:SignUpValues) => {
    return axios.post(`${BASE_URL}/api/admin/register`, data)
}
export const adminSignInMutation= (data:SigninValues)=>{
    return axios.post(`${BASE_URL}/api/admin/login`, data)
}

export const CreateEmployeeMutation= (data:EmployeeData)=>{
  return axios.post(`${BASE_URL}/api/admin/login`, data)
}


