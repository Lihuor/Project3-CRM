import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Home from './components/pages/Home';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


import { Provider } from "react-redux";
import store from "./store";

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
import Login from './components/authentication/Login';
import LoginButton from './components/authentication/Login1';
import LogoutButton from './components/authentication/Logout';

// Import Layouts
//  import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <div className="App">     
      <Router>
        <Navigation />
        
        <LoginButton />
        <LogoutButton />
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
              <Dropdown.Item href="#/action-2">Stock Allocation</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Stock Return</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Stock Take</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Stock Transfer</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/electricians">Electricians </NavLink></li>
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/register">Register </NavLink></li>
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/login">Login </NavLink></li>
        
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return(
    <Provider store={store}>
      <Router>
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
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/authentication/login" component={Login} /> */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;