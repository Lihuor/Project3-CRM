import React, { useState } from "react"; 
import { post } from 'axios'; 

function InventoryAdd(props) {
  const initialState = { productName: '', brand: '', quantity: '', date: '' }
  const [inventory, setInventory] = useState(initialState) 

  function handleChange(event) { 
    setInventory({...inventory, [event.target.name]: event.target.value})
  }

  function handleSubmit(event) { 
    event.preventDefault();  
    if(!inventory.productName || !inventory.brand || !inventory.quantity || !inventory.date) return 
    async function postInventory() {
      try {
        const response = await post('/api/inventories', inventory); 
        props.history.push(`/inventories/${response.data._id}`);  
      } catch(error) {
        console.log('error', error);
      }
    }
    postInventory();
  }

  function handleCancel() {
    props.history.push("/inventories");
  }

  return ( 
    <div>
      <h1>Create inventory</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input name="productName" type="text" value={inventory.productName} onChange={handleChange} className="form-control" />
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
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default InventoryAdd;