import React, { useState, createContext, useEffect, useContext } from "react";
import { API } from "../Services/API";
import axios from "axios";
import jwt from "jwt-decode";

export const UserContext = createContext({
    organization: {},
    token: {},
    user: {},
    permissions: [],
    signIn: null,
    logout: null,
});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [permissions, setPermissions] = useState();
    const [organization, setOrganization] = useState();

    useEffect(() => {

        async function getToken() {
            const tokenLocal = localStorage.getItem("token");
            if (tokenLocal) {
                const user = jwt(tokenLocal);

                const permissionResponse = await API().get('/api/permissions', { headers: { Authorization: `Bearer ${tokenLocal}` } });
                if (permissionResponse.status >= 200 && permissionResponse.status < 300) {
                    setPermissions(permissionResponse.data);
                }

                const userResponse = await API().get('/api/users/my-user', { headers: { Authorization: `Bearer ${tokenLocal}` } });
                if (userResponse.status >= 200 && userResponse.status < 300) {
                    setUser(userResponse.data);
                    setOrganization(userResponse.data.organization);
                }

                axios.defaults.headers.common["Authorization"] = `Bearer ${tokenLocal}`;
                setToken(tokenLocal);
            }
        }

        getToken();

    }, [token]);

    async function signIn(email, password, persistSession = true) {
        try {
            delete axios.defaults.headers.common["Authorization"];
            const response = await API().post(`${process.env.REACT_APP_BASEURL}/api/auth`, { email, password }, { headers: { "Content-Type": "application/json" } });
            if (response.status >= 200 && response.status < 300) {
                const permissionResponse = await API().get('/api/permissions', { headers: { Authorization: `Bearer ${response.data.token}` } });
                if (permissionResponse.status >= 200 && permissionResponse.status < 300) {
                    setPermissions(permissionResponse.data);
                }

                const userResponse = await API().get('/api/users/my-user', { headers: { Authorization: `Bearer ${response.data.token}` } });
                if (userResponse.status >= 200 && userResponse.status < 300) {
                    setUser(userResponse.data);
                    setOrganization(userResponse.data.organization);
                }

                if (persistSession === true)
                    localStorage.setItem("token", response.data.token);

                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                setToken(response.data.token);

                return true;
            }
        } catch (e) {
            console.error("credenciais inválidas", e);
        }

        return false;
    }

    function logout() {
        delete axios.defaults.headers.common["Authorization"]
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, token, signIn, logout, permissions, organization }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    return context;
}