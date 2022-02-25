import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import Navbar1 from "./components/Navbar1";
import { TMP } from "./components/TMP";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import LoginPage from "./components/LoginPage";
import MyAppBar from "./components/MyAppBar";
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
        <TMP/>
        {/* <Route exact path="/" render={() => {window.location.href="abc.html"}} /> */}
        {/* {ReactDOM.render(<p>hello world</p>, document.getElementById("map"))} */}
        {/* <Router>
          <Routes>
          <Route exact path="/" render={() => {window.location.href="abc.html"}} />

            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </Router> */}
        
      </div>
    );
  }
}

export default App;
