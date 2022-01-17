import React, { Component } from 'react';
import './App.css';
import Navbar1 from './components/Navbar1';
import { TMP } from './components/TMP';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MyAppBar from './components/MyAppBar';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <MyAppBar/>
        <TMP/>
      </div>
    );
  }
}

export default App;
