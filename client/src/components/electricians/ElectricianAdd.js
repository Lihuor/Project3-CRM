import React, { useState } from "react"; 
import { post } from 'axios'; 

function ElectricianAdd(props) {
  const initialState = { firstName: '', lastName: '', address: '', mobileNumber: '', email: '' }
  const [electrician, setElectrician] = useState(initialState) 

  function handleChange(event) { 
    setElectrician({...electrician, [event.target.name]: event.target.value})
  }

  function handleSubmit(event) { 
    event.preventDefault();  
    if(!electrician.firstName || !electrician.lastName || !electrician.address || !electrician.mobileNumber  || !electrician.email) return 
    async function postElectrician() {
      try {
        const response = await post('/api/electricians', electrician); 
        props.history.push(`/electricians/${response.data._id}`);  
      } catch(error) {
        console.log('error', error);
      }
    }
    postElectrician();
  }

  function handleCancel() {
    props.history.push("/electricians");
  }

  return ( 
    <div>
      <h1>Create electrician</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" type="text" value={electrician.firstName} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" type="text" value={electrician.lastName} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input name="address" type="text" value={electrician.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input name="mobileNumber" type="number" value={electrician.mobileNumber} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" value={electrician.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ElectricianAdd;