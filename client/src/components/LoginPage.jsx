import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../styles/loginPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function LoginPage(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(""); 
  

  async function loginUser(e) {
    e.preventDefault();
    const loginObj = { username: userName, password: password };

    var access_token = "";
    var refresh_token = "";

    console.log(loginObj);
    console.log("begin");
    try {
      const res = await axios.post("/login",loginObj);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);  
      console.log("login success")
      navigate("/")
    }
    catch(err) {
      console.log("err")
      localStorage.setItem("accessToken", null);
      localStorage.setItem("refreshToken", null);
    }   
    console.log("end")
  }

  return (
    <div>
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image1"></div>

            <div className="col-md-6 bg-light bg-image2">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Login Here</h3>
                      <p className="text-muted">
                        Login to place your order
                      </p>
                      <form onSubmit={loginUser}>
                        <div className="mb-3">
                          <input
                            onChange={(e) => setUserName(e.target.value)}
                            id="inputEmail"
                            type="text"
                            placeholder="Email address"
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            value={userName}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            value={password}
                          />
                        </div>
                        <div
                          className="form-check"
                          style={{ paddingBottom: "0.5rem" }}
                        >
                          <input
                            id="customCheck1"
                            type="checkbox"
                            className="form-check-input"
                            style={{ marginLeft: "1rem", marginRight: "0" }}
                          />

                          <label
                            htmlFor="customCheck1"
                            className="form-check-label"
                            style={{ marginRight: "2rem" }}
                          >
                            Remember password
                          </label>
                        </div>

                        <div className="d-grid gap-2 mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                            // onClick={loginUser}
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;