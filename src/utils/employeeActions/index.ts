import axios from "axios";
import { BASE_URL } from "..";
import { EmployeeData } from "../adminActions";

interface SigninValues{
    email: string;
    password: string;
  }

  export interface LeaveType{

        id?: string;
        createdOn?: string; // You might want to use Date instead if you parse it
        status?: string;
        reviewed?: boolean;
        employeeId?: string;
        duration?: number;
        reason: string;
        startDate: string; // You might want to use Date instead if you parse it
        endDate: string; // You might want to use Date instead if you parse it
        leaveType: string;
        employee?:EmployeeData
      }
      
const EmployeeToken = localStorage.getItem("employee-token")

export const EmployeeSignInMutation= (data:SigninValues)=>{
    return axios.post(`${BASE_URL}/api/employee/login`, data)
}
export const getSingleEmployee = ()=>{
    return axios.get(`${BASE_URL}/employees/employee`,{headers:{
        "Authorization":`Bearer ${EmployeeToken}`
    }})
}
export const requestLeave=(data:LeaveType)=>{
    return axios.post(`${BASE_URL}/leave/request`,data,{headers:{
        "Authorization":`Bearer ${EmployeeToken}`
    }})}
   
    export const getEmpLeaveHistory = ()=>{
        return axios.get(`${BASE_URL}/leave/history`,{headers:{
            "Authorization":`Bearer ${EmployeeToken}`
        }})}