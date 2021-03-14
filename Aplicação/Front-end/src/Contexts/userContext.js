import React, {useContext, useState, createContext} from 'react';

const UserContext = createContext({token: ""});

export function UserContextProvider({children}){

    const [token, setToken] = useState(null);

    return (
        <UserContext.Provider value={{token}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const context = useContext(UserContext);
    return context;
}