import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@material-ui/icons/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Icon from "../images/Icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { requestAccessToken } from "../Utils/requestAccessToken";
import { makeStyles } from "@material-ui/core/styles";
import bImg from "../images/navpic8.jpg";
import { Brightness1 } from "@material-ui/icons";

const pages = ["Buy", "Sell", "Rent"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundImage: `url(${bImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "100%",
    height: "auto",
    filter: "brightness(0.9)",
  },
}));

const styles = {
  customizeToolbar: {
    minHeight: 72,
  },
};

function MyAppBar() {
  const navigate = useNavigate();

  const classes1 = useStyles();
  useEffect(async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    try {
      if (token === "null") throw "null";
      const resp = await axios.get("/property", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log("in error");
      localStorage.setItem("accessToken", null);
      requestAccessToken().then((msg) => {
        console.log("req access token resp", msg);
        if (!msg) navigate("/login");
      });
    }
  });

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const token = localStorage.getItem("accessToken");
  // if(token === null) {
  //   navigate("/login")
  // }

  return (
    <div className={classes1.header} style={{ height: "50vw" }}>
      <AppBar
        position="sticky"
        style={{
          boxShadow: "none",
          color: "black",
          backgroundColor: "black",
          opacity: "70%",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <Typography
            variant="h6" 
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography> */}
            {/* <img src={Icon} alt='logo' style={{width:"120px", marginRight:"2rem"}}/> */}
            {/* <Typography
          
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOCATESY
          </Typography> */}

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              style={{ alignSelf: "start", color: "white" }}
            >
              <IconButton
                size="large"
                aria-label="suraj"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <img
              src={Icon}
              alt="logo"
              style={{
                width: "120px",
                marginRight: "8rem",
              }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "medium",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Suraj" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default MyAppBar;
