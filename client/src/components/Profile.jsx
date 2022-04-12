import React, { Component } from "react";
import TableUI from "./TableUI";
import "../styles/profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyAppBar from "./MyAppBar";

function loadData(endpoint, parameters, setData) {
  axios
    .get(endpoint, { params: parameters })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.log(err));
}

export default function Profile() {
  const navigate = useNavigate();

  const uname = localStorage.getItem("userName"); //TODO change logic
  const fletter = uname.trim()[0].toUpperCase();

  const [boughtPropertyRows, setBoughtPropertyRows] = useState([]);
  const [soldPropertyRows, setSoldPropertyRows] = useState([]);
  const [onrentPropertyRows, setOnrentPropertyRows] = useState([]);
  const [rentedPropertyRows, setRentedPropertyRows] = useState([]);
  let headings = [
    "Property Name",
    "Location",
    "Type",
    "Rooms",
    "Area Type",
    "Base Price",
    "Possession",
  ];

  useEffect(() => {
    console.log(uname);
    if (uname === "null") {
      navigate("/login");
    }

    let buyparameters = {};
    buyparameters["userName"] = uname;
    buyparameters["type"] = "bought";

    let soldparameters = {};
    soldparameters["userName"] = uname;
    soldparameters["type"] = "sold";

    let onrentparameters = {};
    onrentparameters["userName"] = uname;
    onrentparameters["type"] = "onrent";

    let rentedparameters = {};
    rentedparameters["userName"] = uname;
    rentedparameters["type"] = "rented";

    // //let parameters = { "userName" : "suraj", "type" : "bought"};
    loadData("/profile", buyparameters, setBoughtPropertyRows);
    loadData("/profile", soldparameters, setSoldPropertyRows);
    loadData("/profile", onrentparameters, setOnrentPropertyRows);
    loadData("/profile", rentedparameters, setRentedPropertyRows);
  }, []);

  return (
    <>
      <MyAppBar />
      <div>
        <img
          className="bgImg"
          src="https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div class="container d-flex justify-content-center align-items-center">
          <div class="card">
            <div class="upper">
              {" "}
              <img
                src="https://i.imgur.com/Qtrsrk5.jpg"
                class="img-fluid"
              />{" "}
            </div>
            <div class="user text-center">
              <div class="profile">
                {" "}
                <img
                  src={process.env.PUBLIC_URL + "/letters/" + fletter + ".jpg"}
                  class="rounded-circle"
                  width="80"
                />{" "}
              </div>
            </div>
            <div class="mt-5 text-center">
              <h4 class="mb-0">{uname}</h4>{" "}
              <span class="text-muted d-block mb-2">India</span>
              <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                <div class="stats">
                  <h6 class="mb-0">Bought Properties</h6>{" "}
                  <span>{boughtPropertyRows.length}</span>
                </div>
                <div class="stats">
                  <h6 class="mb-0">Sold Properties</h6>{" "}
                  <span>{soldPropertyRows.length}</span>
                </div>
                <div class="stats">
                  <h6 class="mb-0">On Rent Properties</h6>{" "}
                  <span>{onrentPropertyRows.length}</span>
                </div>
                <div class="stats">
                  <h6 class="mb-0">Rented Properties</h6>{" "}
                  <span>{rentedPropertyRows.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tableUI">
          <h2 style={{ color: "black", marginBottom: "20px" }}>
            Bought Properties
          </h2>
          <TableUI headings={headings} rows={boughtPropertyRows} />

          <h2
            style={{
              color: "black",
              marginBottom: "20px",
              marginTop: "80px",
            }}
          >
            Sold Properties
          </h2>
          <TableUI headings={headings} rows={soldPropertyRows} />

          <h2
            style={{
              color: "black",
              marginBottom: "20px",
              marginTop: "80px",
            }}
          >
            Onrent Properties
          </h2>
          <TableUI headings={headings} rows={onrentPropertyRows} />

          <h2
            style={{
              color: "black",
              marginBottom: "20px",
              marginTop: "80px",
            }}
          >
            Rented Properties
          </h2>
          <TableUI headings={headings} rows={rentedPropertyRows} />
        </div>
      </div>
    </>
  );
}
