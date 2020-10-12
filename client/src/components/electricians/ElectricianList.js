import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';

function ElectricianList() {
  const [electricians, setElectrician] = useState([])

  useEffect(function() {
    async function getElectricians() {
      try {
        const response = await axios.get("/api/electricians");
        setElectrician(response.data);
      } catch(error) {
        console.log('error', error);
      }
    }        
    getElectricians();
  }, []);

  return (
    <div>
      <h2>
        Electricians
        <Link to="/electricians/new" className="btn btn-primary float-right">Create Electrician</Link> 
      </h2>
      <hr/>
      {electricians.map((electrician) => {
        return(
          <div key={electrician._id}>
            <h4>First Name <Link to={`/electricians/${electrician._id}`}>{electrician.firstName}</Link></h4>
            <h6>Last Name: <Link to={`/electricians/${electrician._id}`}>{electrician.lastName}</Link></h6>
            <h6>Address: <Link to={`/electricians/${electrician._id}`}>{electrician.address}</Link></h6>
            <h6>Mobile Number: <Link to={`/electricians/${electrician._id}`}>{electrician.mobileNumber}</Link></h6>
            <h6>Email: <Link to={`/electricians/${electrician._id}`}>{electrician.email}</Link></h6>
            <hr/>
          </div>
        )     
      })}
    </div>
  )
}

export default ElectricianList;