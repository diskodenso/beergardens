import React, {createContext, useState, useEffect} from 'react'
import AuthService from "../services/AuthService.js"



// create and export context

export const AuthContext = createContext();

// gives us a provider (acces of global state) and a consumer

// function which takes in props -> children refers to the 
// component we want to wrap our provider around
export default ({ children }) => {
    // user has value of null, and setUser is updating the user
    const [user, setUser] = useState(null);
    // if the user is authenticated 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // once we got the data we set isLoaded to true
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
            {/* if isLoaded is not true we render out loading, otherwise if it is true we render out 
            application - we wrap our AuthContext provider around the children components to 
            provide global state to the components*/}
            {!isLoaded ? <h1>Loading</h1> :
                // Value prop is providing what we wanna make available as
                // global state (user & is Authenticated as global state)
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                { children }
</AuthContext.Provider>}
        </div>
    )
}
