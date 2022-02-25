import axios from "axios";
import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

export function TMP() {
  let lat = 18.450850;
  let lng = 73.879580;
  let tokenStr = "1emACL3rF0LsiOzctqvapbDKANM4u7GA";

  async function setLocation(address) {
    console.log(address)
    await axios.get("http://open.mapquestapi.com/geocoding/v1/address?key="+tokenStr+"&location=" + address).then((res) => {
      lat = parseFloat(res.data["results"][0]["locations"][0]["latLng"]["lat"])
      lng = parseFloat(res.data["results"][0]["locations"][0]["latLng"]["lng"])
      console.log(lat)
      console.log(lng)
    })
    console.log("bellow")
  }

  async function extractAddr() {
    //alert(document.getElementById("addr").value)
    
    await setLocation(document.getElementById("addr").value)
    window.location.replace(process.env.PUBLIC_URL+"map.html?lat="+lat+"&lon="+lng)
  }

  return (  
    <div>
      <input type="text" name="address" id="addr"/>
      <button onClick={extractAddr}>Locate</button>
      {/* <a onClick={extractAddr} href={process.env.PUBLIC_URL+"map.html?lat="+lat+"&lon="+lng} >Location</a> */}
    </div>
  )
}

