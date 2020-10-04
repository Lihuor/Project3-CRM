import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from 'react-router-dom';

function InventoryInfo(props) {
  const [inventory, setInventory] = useState({}); 

  useEffect(function() { 
    async function getInventory() {
      try {
        const response = await axios.get(`/api/inventories/${props.match.params._id}`); 
        setInventory(response.data);      
      } catch(error) {
        console.log('error', error);
      }
    }
    getInventory();    
  }, [props]); 

  async function handleDelete() { 
    try {
      await axios.delete(`/api/inventories/${props.match.params._id}`); 
      props.history.push("/inventories"); 
    } catch(error) {
      console.error(error);
    }
  }

  return ( 
    <div>
      <h2>{inventory.title}</h2>
      <small>_id: {inventory._id}</small>
      <p>{inventory.content}</p>
      <div className="btn-group">
        <Link to={`/inventories/${inventory._id}/edit`} className="btn btn-primary">Edit</Link> 
        <button onClick={handleDelete} className="btn btn-danger">Delete</button> 
        <Link to="/inventories" className="btn btn-secondary">Close</Link>
      </div>
      <hr/>
    </div>
  );
};

export default InventoryInfo;