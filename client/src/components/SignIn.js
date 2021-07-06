import React, { useState, useContext } from 'react';
import AuthService from "../services/AuthService.js";
import Message from "../components/Message.js";
import { AuthContext } from "../context/AuthContext.js";


const SignIn = () => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  // create onChange Functions by getting the event object (e)
  // then we prevent the default action from accuring
  // we updating the setUser to whats the user is typing in
  const onChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }
  // create onSubmit function
  // get the event object and prevent the default from having
  const onSubmit = e => {
    // use Authservice we have coded and we pass in the user which
    // returns a promise (so we say .then) and we should get back the
    // parsed data
    AuthService.login(user).then(data => {
      // now e can pull out the isAuthenticated, the user and the massage
      // all pulled out from our data(at the end)
      const { isAuthenticated, user, message } = data;
      // next we going to check to see if we have been authenticated
      if (isAuthenticated) {
        // we need to update our global context of the user
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/favorites");
      } else
        setMessage(message)
    });
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in!</h3>
        <label htmlFor="userName" className="sr-only">Username</label>
        <input type="text" name="userName" onChange={onChange}
        className="form control"
          placeholder="Enter Username" />
         <label htmlFor="password" className="sr-only">Password</label>
        <input type="password" name="password" onChange={onChange}
        className="form control"
        placeholder="Enter Password"/>
<button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
      </form>
      {/* underneath our form we have our message component incase we
      have a message to display - if message is not null we render
    the message component ":" otherwise we dont want to render anything */}
      {message ? <Message message={message}/> : null}
    </div>
  )
}
export default SignIn;