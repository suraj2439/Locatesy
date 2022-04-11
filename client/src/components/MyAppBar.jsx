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
import { makeStyles } from "@material-ui/core/styles";
import bImg from "../images/navpic8.jpg";

const pages = ["Buy", "Sell", "Rent"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundImage: `url(${bImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "100%",
    height: "auto",
    filter: "brightness(0.9)"
  },
}));

const styles = {
  customizeToolbar: {
    minHeight: 72,
  },
};

function MyAppBar({ isBg }) {
  const navigate = useNavigate();

  const classes1 = useStyles();
  useEffect(async () => {
    // const token = localStorage.getItem("accessToken");
    // try {
    //   if (token === "null") throw "null";
    //   const resp = await axios.get("/property", {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    // } catch (err) {
    //   console.log("in error");
    //   localStorage.setItem("accessToken", null);
    //   requestAccessToken().then((msg) => {
    //     console.log("req access token resp", msg);
    //     if (!msg) navigate("/login");
    //   });
    // }
  });

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    console.log(e.target.value);
    setAnchorElNav(null);
    // navigate("/")
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUser = () => {
    localStorage.setItem("accessToken", null)
    localStorage.setItem("refreshToken", null)
    localStorage.setItem("userName", null);
  }

  const showProfile = () => {
    navigate("/profile");
  }

  function handleMenuClickEvent(menuChoice) {
    if(menuChoice == "Logout") {
      logoutUser()
      alert("User Logged Out.");

    }
    else if (menuChoice === "Profile") showProfile()
  }
  // const token = localStorage.getItem("accessToken");
  // if(token === null) {
  //   navigate("/login")
  // }

  return (
    <div
      className={isBg ? classes1.header : ""}
      style={{ height: isBg ? "50vw" : "0" }}
    >
      <AppBar
        position="sticky"
        style={{
          boxShadow: "none",
          color: "black",
          backgroundColor: "black",
          opacity: "70%",
        }}
      >
        <Container maxWidth="xl" >
          <Toolbar disableGutters>
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
              onClick={() => {
                navigate("/");
              }}
              style={{
                cursor: "pointer",
                width: "120px",
                marginRight: "8rem",
              }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  // onChange={(e) => handleCloseNavMenu(e.target.value)}
                  onClick={() => {
                    navigate(
                      "/" +
                        (page.toLowerCase() === "buy" ? "" : page.toLowerCase())
                    );
                  }}
                  // onClick={handleCloseNavMenu}
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
                    <Typography
                      value={setting}
                      onClick={() => handleMenuClickEvent(setting)}
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
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
