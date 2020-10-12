import React, { useState } from "react"; 
import { post } from 'axios'; 
// import { useAlert } from 'react-alert';
// import { Alert } from "react-bootstrap";
// import { Link } from 'react-router-dom'

function Register(props) {
    // const alert = useAlert();
  const initialState = { name: '', email: '', password: '', password2: ''}
  const [user, setUser] = useState(initialState)


  function handleChange(event) { 
    setUser({...user, [event.target.name]: event.target.value})
  }

  function handleSubmit(event) {
    alert(`Your username ${user.name} has been created successfully, please enter your ${user.email} and password to login`);
    event.preventDefault();  
    if(!user.name || !user.email || !user.password || !user.password2) return 
    async function postUser() {
      try {
        const response = await post('/api/users', user); 
        props.history.push(`/users/${response.data._id}`);  
      } catch(error) {
        console.log('error', error);
      }
    }
    postUser();
  }

  function handleCancel() {
    props.history.push("/register");
  }

  

  return ( 
    <div>
      <h1>Create User</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Full Name</label>
          <input name="name" type="text" value={user.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" type="text" value={user.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" value={user.password} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Please retype your password</label>
          <input name="password2" type="password" value={user.password2} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <button type="submit" value="Register" className="btn btn-primary">Register</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Register;