import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from 'react-router-dom';

function ElectricianInfo(props) {
  const [electrician, setElectrician] = useState({}); 

  useEffect(function() { 
    async function getElectrician() {
      try {
        const response = await axios.get(`/api/electricians/${props.match.params._id}`); 
        setElectrician(response.data);      
      } catch(error) {
        console.log('error', error);
      }
    }
    getElectrician();    
  }, [props]); 

  async function handleDelete() { 
    try {
      await axios.delete(`/api/electricians/${props.match.params._id}`); 
      props.history.push("/electricians"); 
    } catch(error) {
      console.error(error);
    }
  }

  return ( 
    <div>
      <h5>Electrician Name:</h5>
      <h2> {electrician.firstName} {electrician.lastName} </h2>
      {/* <small>_id: {electrician._id}</small> */}
      <p>Address: {electrician.address}</p>
      <p>Mobile Number: {electrician.mobileNumber} pcs</p>
      <p>Email: {electrician.email} pcs</p>
      <div className="btn-group">
        <Link to={`/electricians/${electrician._id}/edit`} className="btn btn-primary">Edit</Link> 
        <button onClick={handleDelete} className="btn btn-danger">Delete</button> 
        <Link to="/electricians" className="btn btn-secondary">Close</Link>
      </div>
      <hr/>
    </div>
  );
};

export default ElectricianInfo;