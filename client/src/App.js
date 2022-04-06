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
import SellForm from "./components/SellForm";

// class App extends Component {
//   // componentDidMount () {
//   //   const script = document.createElement("script");
//   //   script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false";
//   //   script.async = true;
//   //   document.body.appendChild(script);
//   //   console.log("init add")
//   // }

//   render() {
//     return (
//       <div className="App">
//         <Router>
//           <Routes>
//             <Route exact path="/" element={<PropertyPage pageType={"buy"}/> }></Route>
//             <Route exact path="/rent" element={<PropertyPage pageType={"rent"}/> }></Route>
//             <Route path="/login" element={<LoginPage />}></Route>
//             <Route path="/indivproperty" element={<IndivProperty />}></Route>
//             <Route path='*' element={<NotFound/>} />
//           </Routes>
//         </Router>

//       </div>
//     );
//   }
// }

// export default App;

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
          <Route path="/indivproperty" element={<IndivProperty />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
