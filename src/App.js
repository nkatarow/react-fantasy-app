import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import PlayerList from './player-list/';
import PlayerDetail from './player-detail/';
import PlayerSummary from './player-summary/';

import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <h1>Fantasy Football</h1>
        <nav>
          <ul>
            <Link to="/player-list">Player List</Link>
            <Link to="/player-detail/2593">Player Detail</Link>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/player-summary/:playerid" component={PlayerSummary} />
        <Route path="/player-detail/:playerid" component={PlayerDetail} />
        <Route path="/player-list" component={PlayerList} />
      </Switch>
    </div>
  </Router>
);

export default App;
