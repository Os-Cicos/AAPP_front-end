'use client'
import { createContext, useEffect, useState } from "react";
export const MenuContext = createContext();

export default function MenuProvider({ children }) {
    const[selected, setSelected] = useState({index:-1, name:null})
    return (
        <MenuContext.Provider value={{ selected, setSelected }}>
            {children}
        </MenuContext.Provider>
    );
}
