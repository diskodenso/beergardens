import React, { useContext } from 'react';
import Home from "./views/Home.js";
import About from "./views/About.js";
import Favorites from "./views/Favorites.js";
import { AuthContext } from "./context/AuthContext.js";

// do the react router 
function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
    <Home></Home>
  );
}

export default App;
