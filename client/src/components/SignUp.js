import React, { useState, useRef, useEffect } from 'react';
import AuthService from "../services/AuthService.js";
import Message from "../components/Message.js";


const SignUp = props => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    }
  }, []);
  
  // create onChange Functions by getting the event object (e)
  // then we prevent the default action from accuring
  // we updating the setUser to whats the user is typing in
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const resetForm = () => {
    setUser({ userName: "", password: "" });
  }
  // create onSubmit function
  // get the event object and prevent the default from having
  const onSubmit = e => {
    e.preventDefault();
    // use Authservice we have coded and we pass in the user which
    // returns a promise (so we say .then) and we should get back the
    // parsed data
    AuthService.register(user).then(data => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/signIp")
        }, 2000)
      }
    });
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Sign Up!</h3>
        <label htmlFor="userName" className="sr-only">Username</label>
        <input type="text" name="userName" onChange={onChange}
        className="form control"
          placeholder="Enter Username" />
        <label htmlFor="email" className="sr-only">Email</label>
        <input type="email" name="email" onChange={onChange}
        className="form control"
          placeholder="Enter valid Email" />
         <label htmlFor="password" className="sr-only">Password</label>
        <input type="password" name="password" onChange={onChange}
        className="form control"
        placeholder="Enter Password"/>
<button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
      </form>
      {/* underneath our form we have our message component incase we
      have a message to display - if message is not null we render
    the message component ":" otherwise we dont want to render anything */}
      {message ? <Message message={message}/> : null}
    </div>
  )
}
export default SignUp;