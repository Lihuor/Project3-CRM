import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Home from './components/pages/Home';
// Import Inventories
import InventoryList from './components/inventories/InventoryList';
import InventoryInfo from './components/inventories/InventoryInfo';
import InventoryAdd from './components/inventories/InventoryAdd';
import InventoryEdit from './components/inventories/InventoryEdit';

// Import Electricians
import ElectricianList from './components/electricians/ElectricianList';
import ElectricianInfo from './components/electricians/ElectricianInfo';
import ElectricianAdd from './components/electricians/ElectricianAdd';
import ElectricianEdit from './components/electricians/ElectricianEdit';

// Import Authentication
import Register from './components/authentication/Register';


function App() {
  return (
    <div className="App">     
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

function Navigation() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className='container'>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home Page</NavLink></li>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Inventories
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/inventories">Creating New Inventories</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/electricians">Electricians </NavLink></li>
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/register">Register </NavLink></li>
        
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/inventories" component={InventoryList} />
      <Route exact path="/inventories/new" component={InventoryAdd} />
      <Route exact path="/inventories/:_id" component={InventoryInfo} />
      <Route exact path="/inventories/:_id/edit" component={InventoryEdit} />
      <Route exact path="/electricians" component={ElectricianList} />
      <Route exact path="/electricians/new" component={ElectricianAdd} />
      <Route exact path="/electricians/:_id" component={ElectricianInfo} />
      <Route exact path="/electricians/:_id/edit" component={ElectricianEdit} />
      <Route exact path="/register" component={Register} />
      {/* <Route exact path="/authentication/login" component={Login} /> */}
    </Switch>
  );
}

export default App;