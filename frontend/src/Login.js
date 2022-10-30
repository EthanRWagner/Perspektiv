import React, {useState} from 'react';
import PropTypes from "prop-types";

function Login(props){
    const [user, setUser] = useState(
      {
        username: "",
        password: "",
      }
    );

    Login.propTypes = {
      handleSubmit: PropTypes.any.isRequired
   }
  
    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "password")
        setUser(
           {username: user['name'], password: value}
        );
      else     
         setUser(
           {username: value, password: user['job']}   
         );
    }
  
    function LoginForm() {
      props.handleSubmit(user);
      setUser({username: '', password: ''});
    }
  
    return (
      <form>
        <label htmlFor='"name'>Username</label>
        <input 
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange} />
        <label htmlFor='job'>Password</label>
        <input 
          type="text"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange} />
        <input type="button" value="Submit" onClick={LoginForm}/>
      </form>
    )
  }

  export default Login