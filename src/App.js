import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import PlayerDetails from './player-details/';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={PlayerDetails} />
        <Route path="" />
      </Switch>
    </div>
  </Router>
);

export default App;
