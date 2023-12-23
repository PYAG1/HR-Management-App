import axios from "axios"
import toast from "react-hot-toast"
import { BASE_URL } from "..";
import {  } from "react-router-dom";

interface SignUpValues {
    email: string;
    password: string;
    companyCapacity: string;
  }

  interface SigninValues{
    email: string;
    password: string;
  }


export const signUpMutation = (data:SignUpValues) => {
    return axios.post(`${BASE_URL}/api/admin/register`, data)
}
export const adminSignInMutation= (data:SigninValues)=>{
    return axios.post(`${BASE_URL}/api/admin/login`, data)
}

