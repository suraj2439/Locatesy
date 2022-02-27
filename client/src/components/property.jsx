import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import "../styles/property.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
});

export default function propertyCard() {
  const classes = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });

  function cardOnClick() {}

  return (
    <Card
      sx={{ maxWidth: 345, lineHeight: 5 }}
      className={classes.root}
      classes={{ root: state.raised ? classes.cardHovered : "" }}
      onMouseOver={() => setState({ raised: true, shadow: 3 })}
      onMouseOut={() => setState({ raised: false, shadow: 1 })}
      raised={state.raised}
      zdepth={state.shadow}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://mediacdn.99acres.com/media1/16526/18/330538344M-1637844816719.jpg"
          alt="green iguana"
        />
        <hr style={{ margin: "0", padding: "0" }} />
        <CardContent className="cardStyle">
          <Typography
            className="textStyle"
            sx={{ m: 0 }}
            gutterBottom
            variant="subtitle1"
            component="div"
            align="left"
          >
            <strong>Maithili Square</strong>
          </Typography>
          <Typography
            className="textStyle"
            sx={{ m: 0 }}
            gutterBottom
            variant="subtitle1"
            component="div"
            align="left"
          >
            Apartment 2 BHK
          </Typography>
          <Typography
            className="textStyle"
            sx={{ m: 0 }}
            variant="body1"
            color="#F7F7F7"
            align="left"
          >
            In Kiwale, Pune
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
