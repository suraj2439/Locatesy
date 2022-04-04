import React, { useEffect, useState } from "react";
import MyAppBar from "./MyAppBar";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"
import { Map } from "./Map";
import PoolIcon from '@mui/icons-material/Pool';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SchoolIcon from '@mui/icons-material/School';
import HotTubIcon from '@mui/icons-material/HotTub';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PetsIcon from '@mui/icons-material/Pets';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import ComputerIcon from '@mui/icons-material/Computer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import "../styles/indivProperty.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function IndivProperty() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const {state} = useLocation();
    let propertyData = state
    if(! propertyData) return (<div>404 Not Found</div>)
    console.log(propertyData["location"])
    const [isLocateClicked, setIsLocateClicked ]= useState(false)
    const [progress, setProgress] = useState(false)

    const colors = ["cadetblue", "yellowgreen", "purple", "orange", "gray", "brown", "blue-green", "cadetblue"]

    let facilities = [
        <div className="facilityContainer"><PoolIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Swimming Pool</div></div>,
        <div className="facilityContainer"><SportsSoccerIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Football</div></div>,
        <div className="facilityContainer"><LocalFloristIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Flower Garden</div></div>,
        <div className="facilityContainer"><SchoolIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Top Schools</div></div>,
        <div className="facilityContainer"><HotTubIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Hot Bath Tub</div></div>,
        <div className="facilityContainer"><SelfImprovementIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Yoga Club</div></div>,
        <div className="facilityContainer"><PetsIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Pets Garden</div></div>,
        <div className="facilityContainer"><BatteryCharging80Icon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Car Charging</div></div>,
        <div className="facilityContainer"><ComputerIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Computer Lab</div></div>,
        <div className="facilityContainer"><FitnessCenterIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Gym</div></div>,
        <div className="facilityContainer"><GroupsIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}} className="facility"/><div className="facilityText">Club</div></div>,
        <div className="facilityContainer"><LocalBarIcon style={{fontSize : "5vw", color : colors[Math.floor(Math.random() * 5)]}}  className="facility"/><div className="facilityText">Bar</div></div>,
    ]

    function locate() {
        setProgress(true);
        setIsLocateClicked(true);
    }

    function initPayment() {
        navigate("/error");
    }

    // propertyData = {"name" : "Parklane Lifeseasons", "propertyType" : "Residential Apartment", "rooms" : "2BHK", 
    //         "location" : "Dhanori, Pune, Maharashtra", "latitude" : "24.53", "longitude" : "32.52",
    //         "priceRange" : "₹ 50.98 - 51.64 L", "areaRange" : "687 - 696 sq. ft.", "status": "Under Construction", 
    //         "basePrice" : "7420 per sq. ft.", "areaType" : "Carpet Area", "possession" : "June 2025", "descr" : "Make Kanha Vrundavan Heritage your next home. Book your 1 BHK flat in Saswad, Pune. With a carpet area of 475.44 sq. ft., the flat combines the finest design and amenities in Pune to provide a living experience unlike any other. Here is an exclusive deal for you. Buy your 1 BHK flat for Rs. 25 Lac. It is a new launch p...less"}
    
    return (
        progress ? 
        <div className="progressBarContainer">
            {isLocateClicked && <Map address={propertyData["location"] + ", pune, maharashtra"} setProgressBar={setProgress}/>}
            <CircularProgress className="progressBar" color="secondary" />
        </div> :
        <div className="indivProperty">
            <MyAppBar/>
            <div className="propertyContainer">
                <img className="propertyImage" src={propertyData["link"]} alt="property image" />
                <div class="overlay"></div>
                <div className="propertyTitle">
                    <div className="descr">{propertyData["rooms"]} {propertyData["propertyType"]}</div>
                    <div className="name"><strong>{propertyData["name"]}</strong></div>
                    <div className="location">{propertyData["location"]}</div>
                </div>
            </div>

            <div className="propertyDetails">
                <div className="price">
                    <div className="priceRange"><strong>{propertyData["priceRange"]}</strong> </div>
                    <div className="basePrice">(Base Price: rs. {propertyData["basePrice"]})</div>
                </div>

                <div className="area">
                    <div className="size"><strong> {propertyData["areaRange"]}</strong></div>
                    <div className="areaType">({propertyData["areaType"]})</div>
                </div>

                <div className="propertyStatus">
                    <div className="status"><strong>{propertyData["status"]}</strong> </div>
                    <div className="possession">(Possession: {propertyData["possession"]})</div>
                </div>
            </div>      
            <div className="highlights">
                <strong>Highlights: </strong> {propertyData["descr"]}
            </div>      
            <div className="btns"> 
                <Button onClick={initPayment} className="action" size="large" color="success" variant="contained" startIcon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />}>Take Action</Button>
                <Button onClick={locate} className="map" size="large" color="primary" variant="contained" startIcon={<FontAwesomeIcon icon={faMapLocationDot} />}>Locate</Button>
            </div>

            <div className="facContainer">
                <div className="topFac">Top Facilities of <strong>{propertyData["name"]}</strong> </div>
                {facilities.map((x)=> x)}
            </div>

        </div>
    )
}