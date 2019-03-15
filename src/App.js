import React, { Component } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
             <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/leaderboard' component={Leaderboard}/>
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
