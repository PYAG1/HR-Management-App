import { ReactNode, createContext, useContext, useState } from "react";

type HrAppContextProps = {
    employeeName: string | null;
    setEmployee:React.Dispatch<React.SetStateAction<string>>,
    showNotification:boolean,
    setShowNotification:React.Dispatch<React.SetStateAction<boolean>>
  };
const HrAppContext = createContext<HrAppContextProps | undefined>(undefined);



export const HrAppContextProvider = ({children}:{children:ReactNode})=>{
    const [showNotification,setShowNotification] = useState(false)
const [employeeName,setEmployee]= useState("")

    return <HrAppContext.Provider value={{employeeName,setEmployee,showNotification,setShowNotification}}>{children}</HrAppContext.Provider>
}
export const useHrAppContext = (): HrAppContextProps => {
    const context = useContext(HrAppContext);
    if (!context) {
      throw new Error('useHrAppContext must be used within an HrAppProvider');
    }
    return context;
  };