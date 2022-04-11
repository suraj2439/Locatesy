import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import LoginPage from "./components/LoginPage";
import IndivProperty from "./components/IndivProperty";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropertyPage from "./components/propertyPage";
import { NotFound } from "./components/NotFound";
import SignUp from "./components/Signup";
import Profile from "./components/Profile";
import SellForm from "./components/SellForm"

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<PropertyPage pageType={"buy"} />}
          ></Route>
          <Route
            exact
            path="/rent"
            element={<PropertyPage pageType={"rent"} />}
          ></Route>
          <Route exact path="/sell" element={<SellForm />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/indivproperty" element={<IndivProperty />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
