import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';

function InventoryEdit(props) {

  const initialState = { productName: '', brand: '', quantity: '', date: ''}
  const [inventory, setInventory] = useState(initialState)

  useEffect(function() {
    async function getInventory() {
      try {
        const response = await get(`/api/inventories/${props.match.params._id}`);
        setInventory(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getInventory();    
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateInventory() {
      try {
        await patch(`/api/inventories/${inventory._id}`, inventory);
        props.history.push(`/inventories/${inventory._id}`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateInventory();
  }

  function handleChange(event) {
    setInventory({...inventory, [event.target.name]: event.target.value})
  }

  function handleCancel() {
    props.history.push(`/inventories/${inventory._id}`);
  }

  return (
    <div>
      <h1>Edit {inventory.productName}</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="productName" value={inventory.productName} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Product Brand</label>
          <input name="brand" type="text" value={inventory.brand} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Product Quantity</label>
          <input name="quantity" type="number" value={inventory.quantity} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Create Date</label>
          <input name="date" type="date" value={inventory.date} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default InventoryEdit;