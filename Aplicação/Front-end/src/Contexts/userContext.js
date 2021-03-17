import React, {useContext, useState, createContext} from 'react';

const UserContext = createContext({token: "", sigIn: null});

export function UserContextProvider({children}){

    const [token, setToken] = useState(null);

    function sigIn(email, password){
        setToken("");
    }

    return (
        <UserContext.Provider value={{token, sigIn}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const context = useContext(UserContext);
    return context;
}