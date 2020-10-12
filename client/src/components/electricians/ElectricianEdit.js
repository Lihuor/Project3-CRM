import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';

function ElectricianEdit(props) {

  const initialState = { firstName: '', lastName: '', address: '', mobileNumber: '', email: '' }
  const [electrician, setElectrician] = useState(initialState) 

  useEffect(function() {
    async function getElectrician() {
      try {
        const response = await get(`/api/electricians/${props.match.params._id}`);
        setElectrician(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getElectrician();    
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateElectrician() {
      try {
        await patch(`/api/electricians/${electrician._id}`, electrician);
        props.history.push(`/electricians/${electrician._id}`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateElectrician();
  }

  function handleChange(event) {
    setElectrician({...electrician, [event.target.name]: event.target.value})
  }

  function handleCancel() {
    props.history.push(`/electricians/${electrician._id}`);
  }

  return (
    <div>
      <h1>Edit {electrician.firstName} {electrician.lastName}</h1>
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
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ElectricianEdit;