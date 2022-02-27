import React from "react";
import "../styles/indivProperty.css";
import MyAppBar from "./MyAppBar";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";

export default function IndivProperty() {
    return (
        <div className="indivProperty">
            <div className="propertyContainer">
                <img className="propertyImage" src="https://mediacdn.99acres.com/media1/16526/18/330538344M-1637844816719.jpg" alt="property image" />
                <div class="overlay"></div>
                <div className="propertyTitle">
                    <div className="descr">2BHK Residential Apartment</div>
                    <div className="name"><strong>Parklane Lifeseasons</strong></div>
                    <div className="location">Dhanori, Pune, Maharashtra</div>
                </div>
            </div>

            <div className="propertyDetails">
                <div className="price">
                    <div className="priceRange"><strong>rs. 50.98 - 51.64 L</strong> </div>
                    <div className="basePrice">Base Price: rs. 7420 per sq. ft.</div>
                </div>

                <div className="area">
                    <div className="size">687-696  sq.ft.</div>
                    <div className="areaType">(Carpet Area)</div>
                </div>

                <div className="propertyStatus">
                    <div className="status">Under Construction</div>
                    <div className="possession">Possession: June 2025</div>
                </div>
            </div>      
            <div className="highlights">
                <strong>Highlights: </strong> Make Kanha Vrundavan Heritage your next home. Book your 1 BHK flat in Saswad, Pune. With a carpet area of 475.44 sq. ft., the flat combines the finest design and amenities in Pune to provide a living experience unlike any other. Here is an exclusive deal for you. Buy your 1 BHK flat for Rs. 25 Lac. It is a new launch p...less
            </div>      
            <div className="btns"> 
                <Button className="action" size="large" color="success" variant="contained" startIcon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />}>Take Action</Button>
                <Button className="map" size="large" color="primary" variant="contained" startIcon={<FontAwesomeIcon icon={faMapLocationDot} />}>Locate</Button>
            </div>
           
        </div>
        
    )
}