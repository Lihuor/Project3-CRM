import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';

function InventoryList() {
  const [inventories, setInventories] = useState([])

  useEffect(function() {
    async function getInventories() {
      try {
        const response = await axios.get("/api/inventories");
        setInventories(response.data);
      } catch(error) {
        console.log('error', error);
      }
    }        
    getInventories();
  }, []);

  return (
    <div>
      <h2>
        Inventories
        <Link to="/inventories/new" className="btn btn-primary float-right">Create Inventory</Link> 
      </h2>
      <hr/>
      {inventories.map((inventory) => {
        return(
          <div key={inventory._id}>
            <h4>Product Name: <Link to={`/inventories/${inventory._id}`}>{inventory.productName}</Link></h4>
            <h6>Brand: <Link to={`/inventories/${inventory._id}`}>{inventory.brand}</Link></h6>
            <h6>Quantity: <Link to={`/inventories/${inventory._id}`}>{inventory.quantity}</Link></h6>
            <h6>Date Created: <Link to={`/inventories/${inventory._id}`}>{inventory.date.split("T")[0]}</Link></h6>
            {/* <small>_id: {inventory._id}</small> */}
            <hr/>
          </div>
        )     
      })}
    </div>
  )
}

export default InventoryList;