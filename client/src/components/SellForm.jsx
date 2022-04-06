import React from "react";
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
import { teal, grey } from "@material-ui/core/colors";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useState } from "react";
// import { DesktopDatePicker } from "@mui/lab";
//import DesktopDatePicker from "@material-ui/lab/DesktopDatePicker";

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

function SellForm(props) {
  const { classes, open, onClose } = props;
  const [propertyType, setPropertyType] = useState("");
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  return (
    <Dialog
      className={classes.root}
      fullWidth
      maxWidth="md"
      open={true}
      onClose={() => onClose("wireModal")}
    >
      <DialogContent className={classes.padding}>
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
                // defaultValue="None"
                id="property_name"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                margin="dense"
                variant="standard"
                label="Location"
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
              ></TextField>
            </Grid>
            <Grid item xs={10}>
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
            <Grid item xs={10}>
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
                style={{ marginBottom: 20 }}
                fullWidth
                margin="dense"
                id="highestPrice"
                variant="standard"
                label="Highest Price(in Lakhs)"
              ></TextField>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Property Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={propertyType}
                  label="Age"
                  onChange={(e) => setPropertyType(e.target.value)}
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
                id="highestPrice"
                variant="standard"
                label="Desc"
                multiline
              ></TextField>
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="City"
                id="city"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="State/Province"
                id="state-province"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                //fullWidth
                margin="dense"
                variant="outlined"
                label="Postal Code"
                id="postal-code"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="Street Address"
                id="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                multiline
                rows="5"
                variant="outlined"
                label="Additional Info"
                id="additional-info"
              />
            </Grid>
            {/* <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              renderInput={(params) => <TextField {...params} />}
            /> */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(SellForm);
