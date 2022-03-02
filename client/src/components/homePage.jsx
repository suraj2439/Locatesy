import React, {useEffect, useState} from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyAppBar from "./MyAppBar";
import Property from "./property";
import Container from "@mui/material/Container";
import "../styles/homePage.css";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function loadBuyPropertyData(setData) {
  axios.get("/buyproperties").then((res) => {
    setData(res.data.slice(0, 100))
  }).catch((err) => console.log(err))
}

export default function homePage() {
  const [propertyData, setPropertyData] = useState([])

  useEffect(() => {
    loadBuyPropertyData(setPropertyData)
  }, [])

  return (
    <div className="backGround">
      <MyAppBar isBg={true}/>

      <Container sx={{ mt: "2rem" }} fixed>
        <Grid
          container
          rowSpacing={{ xs: 4, md: 6 }}
          columnSpacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(propertyData.length)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Property data={propertyData[index]}/>
            </Grid>
          ))} 
        </Grid>
      </Container>
    </div>
  );
}
