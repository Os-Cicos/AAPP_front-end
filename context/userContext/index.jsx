'use client'
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export const UserContext = createContext();

const validUsers = [0, 1, 2, 3];

export default function UserProvider({ children }) {
    const [user, setUser] = useState(-1);
    const searchParams = useSearchParams();
 
    const iduser = parseInt(searchParams.get('iduser'));

    useEffect(() => {
        if (iduser !== null) {
            setUser(iduser);
        }
    }, [iduser]);

    useEffect(() => {
        if (user !== -1 && !validUsers.includes(user)) {
            alert('Usuário Inválido, chatbot indisponível');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {user !== -1 && !validUsers.includes(user) ?  <></>:children}
        </UserContext.Provider>
    );
}
