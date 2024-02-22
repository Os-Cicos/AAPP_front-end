'use client'
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const searchParams = useSearchParams();

    const iduser = parseInt(searchParams.get('idUser'));

    useEffect(() => {
        if (!isNaN(iduser)) {
            setUser(iduser);
        } else {
            alert('idUser inválido');
        }
    }, [iduser]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {user === null ? <></> : children}
        </UserContext.Provider>
    );
}
