"use client"
import {createContext,  useState ,useContext } from "react";

const AppContext=createContext<any>([])
export function AppWrapper({ children }:{
    children: React.ReactNode;
}){
    const [selectedIDs, setSelectedIDs]=useState([])

    

return (
    <AppContext.Provider value={{selectedIDs, setSelectedIDs}}>
        {children}
    </AppContext.Provider>
)}

export function useAppContext(){
    return useContext(AppContext);
}
