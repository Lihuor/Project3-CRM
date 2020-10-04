import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Home from './components/pages/Home';
import InventoryList from './components/inventories/InventoryList';
import InventoryInfo from './components/inventories/InventoryInfo';
import InventoryAdd from './components/inventories/InventoryAdd';
import InventoryEdit from './components/inventories/InventoryEdit';

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
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/inventories">Inventories</NavLink></li>
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
    </Switch>
  );
}

export default App;