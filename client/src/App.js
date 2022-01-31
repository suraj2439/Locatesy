import React, { Component } from 'react';
import './App.css';
import Navbar1 from './components/Navbar1';
import { TMP } from './components/TMP';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import LoginPage from './components/LoginPage';
import MyAppBar from "./components/MyAppBar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Routes>
          <Route exact path="/" element={<MyAppBar/>}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
      </div>
    );
  }
}

export default App;
