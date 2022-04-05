import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import "../styles/loginPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  async function loginUser(e) {
    e.preventDefault();
    const loginObj = { username: userName, password: password };
    console.log(loginObj);
    console.log("begin");
    try {
      const res = await axios.post("/login", loginObj);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      console.log("login success");
      navigate("/");
    } catch (err) {
      console.log("err");
      localStorage.setItem("accessToken", null);
      localStorage.setItem("refreshToken", null);
    }
    console.log("end");
  }

  // return (
  //   <div>
  //     <div className="maincontainer">
  //       <div className="container-fluid">
  //         <div className="row no-gutter">
  //           <div className="col-md-6 d-none d-md-flex bg-image1"></div>

  //           <div className="col-md-6 bg-light bg-image2">
  //             <div className="login d-flex align-items-center py-5">
  //               <div className="container">
  //                 <div className="row">
  //                   <div className="col-lg-10 col-xl-7 mx-auto">
  //                     <h3 className="display-4">Login Here</h3>
  //                     <p className="text-muted">
  //                       Login to place your order
  //                     </p>
  //                     <form onSubmit={loginUser}>
  //                       <div className="mb-3">
  //                         <input
  //                           onChange={(e) => setUserName(e.target.value)}
  //                           id="inputEmail"
  //                           type="text"
  //                           placeholder="Email address"
  //                           required=""
  //                           className="form-control rounded-pill border-0 shadow-sm px-4"
  //                           value={userName}
  //                         />
  //                       </div>
  //                       <div className="mb-3">
  //                         <input
  //                           onChange={(e) => setPassword(e.target.value)}
  //                           id="inputPassword"
  //                           type="password"
  //                           placeholder="Password"
  //                           required=""
  //                           className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
  //                           value={password}
  //                         />
  //                       </div>
  //                       <div
  //                         className="form-check"
  //                         style={{ paddingBottom: "0.5rem" }}
  //                       >
  //                         <input
  //                           id="customCheck1"
  //                           type="checkbox"
  //                           className="form-check-input"
  //                           style={{ marginLeft: "1rem", marginRight: "0" }}
  //                         />

  //                         <label
  //                           htmlFor="customCheck1"
  //                           className="form-check-label"
  //                           style={{ marginRight: "2rem" }}
  //                         >
  //                           Remember password
  //                         </label>
  //                       </div>

  //                       <div className="d-grid gap-2 mt-2">
  //                         <button
  //                           type="submit"
  //                           className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
  //                           // onClick={loginUser}
  //                         >
  //                           Sign in
  //                         </button>
  //                       </div>
  //                     </form>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={loginUser}>
            <TextField
              onChange={(e) => setUserName(e.target.value)}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
