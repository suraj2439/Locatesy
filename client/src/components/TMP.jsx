import axios from "axios";
import React, { useEffect, useState } from "react";

export function TMP({address}) {
  let lat = 18.450850;
  let lng = 73.879580;

  const [link, setLink] = useState(process.env.PUBLIC_URL+"map.html?lat="+lat+"&lon="+lng)

  useEffect(() => {
    let tokenStr = "1emACL3rF0LsiOzctqvapbDKANM4u7GA";

    console.log(address)
    axios.get("http://open.mapquestapi.com/geocoding/v1/address?key="+tokenStr+"&location=" + address).then((res) => {
      lat = parseFloat(res.data["results"][0]["locations"][0]["latLng"]["lat"])
      lng = parseFloat(res.data["results"][0]["locations"][0]["latLng"]["lng"])
      console.log(lat)
      console.log(lng)
      setLink(process.env.PUBLIC_URL+"map.html?lat="+lat+"&lon="+lng)
      {document.getElementById("anchor").click()}
    })
  
    console.log("hello")
  }, [])
  
  return (  
    <div>
      <a id="anchor" href={link}></a>
     </div>
  )
}

