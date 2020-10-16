import React from 'react';
import Warehousepic1 from '../../Images/Warehousepic1.jpg'
import Warehousepic2 from '../../Images/Warehousepic2.jpg'

console.log (Warehousepic1);

function Home() { 
  return (
    <div className="jumbotron">
      <h1>Welcome to ABC Company Pty.ltd</h1>
      <img src={Warehousepic1} alt="Warehouse1" width="500" height="600"/>
      <img src={Warehousepic2} alt="Warehouse1" width="500" height="600"/>
    </div>
  );
}

export default Home; 