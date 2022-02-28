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

class App extends Component {
  // componentDidMount () {
  //   const script = document.createElement("script");
  //   script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   console.log("init add")
  // }

  render() {
    return (
      <div className="App">
        
        {/* <TMP address={"surat"}/> */}
        {/* <IndivProperty/> */}
        <Router>
          <Routes>
            <Route exact path="/" element={<IndivProperty/> }></Route>

            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </Router>
        
      </div>
    );
  }
}

export default App;
