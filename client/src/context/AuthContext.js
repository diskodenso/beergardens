import { set } from 'mongoose';
import React, {createContext, useState, useEffect} from 'react'
import AuthService from "../services/AuthService.js"



// create context

export const AuthContext = createContext();

// 4. make provider => value / children

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // check if someone is logged in or not
    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);
    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                { children }
</AuthContext.Provider>}
        </div>
    )
}
