import React, { Component } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import on from './on.svg';
import off from './off.svg'

class App extends Component {
  constructor(){
    super()
    this.state = {
      sound : true
    }
  }
  onMute = () => {
    this.setState({sound: !this.state.sound}, () => {
      if (this.state.sound) {
        document.getElementById("sound-img").src = on;
        document.getElementById("music").muted = false;
      }
      else{
        document.getElementById("sound-img").src = off;
        document.getElementById("music").muted = true;
      }
    })
  }

  componentDidMount(){
    document.getElementById('music').play();
  }

  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/leaderboard' component={Leaderboard}/>
        </Switch>
      </Router>
      <div onClick={this.onMute} id='sound-icon'>
        <img alt='mute icon' id='sound-img' src={on}/>
      </div>
      </div>
    );
  }
}

export default App;
