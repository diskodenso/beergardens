import React, { useContext } from 'react';
import Home from "./views/Home.js";
import Maps from "./views/Maps.js";
import About from "./views/About.js";
import Favorites from "./views/Favorites.js";
import { AuthContext } from "./context/AuthContext.js";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
 
// do the react router 
function App() {
  // const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
      <Router>
            <div className="App">

        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/signIn" component={SignIn}>
          </Route>
          <Route exact path="/signUp" component={SignUp}>
          </Route>
          <Route exact path="/favorites">
            <Favorites/>
          </Route>
        </Switch>
            </div>
      </Router>
  );
}

export default App;
