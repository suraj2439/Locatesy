import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import Navbar1 from "./components/Navbar1";
import { TMP } from "./components/TMP";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import LoginPage from "./components/LoginPage";
import MyAppBar from "./components/MyAppBar";
import IndivProperty from "./components/IndivProperty"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import { NotFound } from "./components/NotFound";

class App extends Component {
  // componentDidMount () {
  //   const script = document.createElement("script");
  //   script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   console.log("init add")
  // }

  render() {
    console.log("aaa");
    console.log(process.env)
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/> }></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/indivproperty" element={<IndivProperty />}></Route>
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </Router>
        
      </div>
    );
  }
}

export default App;
