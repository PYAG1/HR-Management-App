import { ReactNode, createContext, useContext } from "react";

type HrAppContextData = {
    Admintoken: string | null;
  };
const HrAppContext = createContext<HrAppContextData | null>(null);



export const useHrAppContext = ()=>{
    return useContext(HrAppContext)
}
export const HrAppContextProvider = ({children}:{children:ReactNode})=>{
    const Admintoken = localStorage.getItem("admin-token")

    return <HrAppContext.Provider value={{Admintoken}}>{children}</HrAppContext.Provider>
}