import React, { useEffect } from "react";
import { withStyles, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { teal, grey, lightgoldenrodyellow } from "@material-ui/core/colors";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
//import DesktopDatePicker from "@material-ui/lab/DesktopDatePicker";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/sellForm.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  primaryColor: {
    color: teal[500],
  },
  secondaryColor: {
    color: grey[700],
  },

  padding: {
    padding: 0,
  },
  mainHeader: {
    backgroundColor: grey[100],
    padding: 20,
    alignItems: "center",
  },
  mainContent: {
    padding: 40,
  },
  secondaryContainer: {
    padding: "20px 25px",
    backgroundColor: grey[200],
  },
});
const countries = [
  {
    value: "Apartment",
    label: "Apartment",
  },
  {
    value: "Office",
    label: "Office",
  },
  {
    value: "Plot",
    label: "Plot",
  },
  {
    value: "Shop",
    label: "Shop",
  },
  {
    value: "Farm Land",
    label: "Farm Land",
  },
];

const status = [
  {
    value: "Under Construction",
    label: "Under Construction",
  },
  {
    value: "Occupied",
    label: "Occupied",
  },
  {
    value: "Ready to Movet",
    label: "Ready to Move",
  },
  {
    value: "New Launch",
    label: "New Launch",
  },
];

const areaType = [
  {
    value: "Super built-up Area",
    label: "Super built-up Area",
  },
  {
    value: "Carpet Area",
    label: "Carpet Area",
  },
];

const sellArr = [
  {
    value: "Sell Property",
    label: "Sell Property",
  },
  {
    value: "Give on rent",
    label: "Give on rent",
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function SellForm(props) {
  const { classes, open, onClose } = props;
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [sellType, setSellType] = useState("");
  const [areaMeasure, setAreaMeasure] = useState("");
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [flag, setFlag] = useState(true);
  const [val, setVal] = useState(new Date("2024-08"));
  const [area, setArea] = useState([500, 1000]);
  const [price, setPrice] = useState([10, 30]);
  const [basePrice, setBasePrice] = useState(100000);

  const navigate = useNavigate();

  useEffect(() => {
    const currUser = localStorage.getItem("userName");
    if (currUser == "null") navigate("/login");
  }, []);

  async function registerProperty(e) {
    e.preventDefault();
    const propObj = {
      name: name,
      location: location,
      propertyType: propertyType,
      type: sellType == "Sell Property" ? "sell" : "rent",
      rooms: rooms,
      priceRange: "Rs " + price[0] + " - " + price[1] + " L",
      areaRange: area[0] + "-" + area[1] + " sq.ft",
      areaType: areaMeasure,
      basePrice: basePrice + " per sq.ft.",
      descr: desc,
      status: propertyStatus,
      possession: monthNames[val.getMonth()] + " " + val.getUTCFullYear(),
      username: localStorage.getItem("userName"),
    };
    console.log(propObj);
    console.log("begin");
    try {
      const res = await axios.post("/registerProperty", propObj);
      console.log("saved");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    console.log("end");
  }

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHByb3BlcnR5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        className="imgC"
      />
      <div className="transP">
        <Dialog
          className={classes.root}
          fullWidth
          maxWidth="md"
          open={true}
          onClose={() => onClose("wireModal")}
        >
          <DialogContent className={classes.padding}>
            <form onSubmit={registerProperty}>
              <Grid container>
                {/* <Grid item xs={8}> */}
                <Grid container direction="row" className={classes.mainHeader}>
                  <Grid item xs={8}>
                    <Typography className={classes.primaryColor} variant="h5">
                      Property Data
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  className={classes.mainContent}
                  spacing={1}
                >
                  <Grid item xs={10}>
                    <TextField
                      style={{ marginBottom: 20 }}
                      fullWidth
                      // select
                      margin="dense"
                      variant="standard"
                      label="Property Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="property_name"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={10} style={{ marginBottom: 30 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Sell or Rent
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sellType}
                        label="sellRent"
                        onChange={(e) => {
                          e.target.value === "Sell Property"
                            ? setFlag(true)
                            : setFlag(false);
                          console.log(e.target.value);
                          setSellType(e.target.value);
                        }}
                      >
                        {sellArr.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      style={{ marginBottom: 20 }}
                      fullWidth
                      margin="dense"
                      variant="standard"
                      label="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      id="location"
                    ></TextField>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      style={{ marginBottom: 20 }}
                      fullWidth
                      margin="dense"
                      id="room"
                      variant="standard"
                      label="Rooms"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={10} style={{ marginBottom: 30 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Property type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={propertyType}
                        label="Age"
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        {countries.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} style={{ marginBottom: 20 }}>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={{ marginBottom: 10 }}
                    >
                      Price Range(in Lakhs)
                    </InputLabel>
                    <Slider
                      getAriaLabel={() => "Price range"}
                      defaultValue={1}
                      value={price}
                      min={0}
                      max={1000}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      valueLabelDisplay="auto"
                      //getAriaValueText={valuetext}
                    />
                  </Grid>
                  {/* <Grid item xs={10}>
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                margin="dense"
                id="startPrice"
                variant="standard"
                label="Starting Price(in Lakhs)"
              ></TextField>
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={{ marginBottom: 30 }}
                fullWidth
                margin="dense"
                id="highestPrice"
                variant="standard"
                label="Highest Price(in Lakhs)"
              ></TextField>
            </Grid> */}
                  <Grid item xs={10} style={{ marginBottom: 30 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Area type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={areaMeasure}
                        label="Age"
                        onChange={(e) => setAreaMeasure(e.target.value)}
                      >
                        {areaType.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} style={{ marginBottom: 10 }}>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={{ marginBottom: 10 }}
                    >
                      Area Range(in sq foots)
                    </InputLabel>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      defaultValue={1}
                      value={area}
                      min={0}
                      max={10000}
                      onChange={(e) => {
                        setArea(e.target.value);
                      }}
                      valueLabelDisplay="auto"
                      //getAriaValueText={valuetext}
                    />
                  </Grid>
                  <Grid item xs={10} style={{ marginBottom: 10 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Property Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={propertyStatus}
                        label="Age"
                        onChange={(e) => setPropertyStatus(e.target.value)}
                      >
                        {status.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      style={{ marginBottom: 20 }}
                      fullWidth
                      margin="dense"
                      id="desc"
                      variant="standard"
                      label="Desc"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      multiline
                    ></TextField>
                  </Grid>
                  <Grid item xs={10} style={{ marginBottom: 10 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Possession"
                        inputFormat="yyyy-MM"
                        views={["year", "month"]}
                        value={val}
                        onChange={(e) => {
                          console.log(e);
                          setVal(e);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      style={{ marginBottom: 10 }}
                      fullWidth
                      margin="dense"
                      id="BasePrice"
                      variant="standard"
                      label={flag ? "Base Price(per sq.ft.)" : "Deposit"}
                      value={basePrice}
                      onChange={(e) => {
                        console.log(value);
                        setBasePrice(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems="center" justifyContent="center">
                <Button
                  style={{ marginBottom: 20 }}
                  type="submit"
                  width="30px"
                  variant="contained"
                  color="primary"
                >
                  Upload Property
                </Button>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default withStyles(styles)(SellForm);
