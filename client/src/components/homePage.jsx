import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyAppBar from "./MyAppBar";
import Property from "./property";
import Container from "@mui/material/Container";
import "../styles/homePage.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function homePage() {
  return (
    <div className="backGround">
      <MyAppBar />

      <Container sx={{ mt: "2rem" }} fixed>
        <Grid
          container
          rowSpacing={{ xs: 4, md: 6 }}
          columnSpacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(20)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Property />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
