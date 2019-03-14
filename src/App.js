import React, { Component } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import Questions from './Pages/Questions/Questions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Questions/>
      </div>
    );
  }
}

export default App;
