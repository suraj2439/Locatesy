require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectId;

mongoose.connect("mongodb://localhost/locatesy-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var conn = mongoose.connection;

const app = express();

app.use(express.json());

// var pwd = bcrypt.hash("sanket", 10);

// var user = {
//   _id: new ObjectID(),
//   name: "Sanket",
//   username: "sanket",
//   password: pwd,
// };

// conn.collection("users").insertOne(user);

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// const stud = new User({
//   _id: 3,
//   name: "sanket",
//   username: "sanket17",
//   password: "123"
// });
// stud.save().then(() => console.log("One entry added"));

const rentPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  propertyName: String,
  locality: String,
  typeOfProperty: String,
  startingPrice: Number,
  area: String,
  photoLink: String,
  lattitude: String,
  longitude: String,
  description: String,
});

const rentProperty = mongoose.model("Rent Property", rentPropertySchema);

const buyPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  propertyName: String,
  locality: String,
  typeOfProperty: String,
  startingPrice: Number,
  area: String,
  photoLink: String,
  lattitude: String,
  longitude: String,
  description: String,
});

const buyProperty = mongoose.model("Buy Property", buyPropertySchema);

const dealtPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  propertyName: String,
  locality: String,
  typeOfProperty: String,
  startingPrice: Number,
  area: String,
  photoLink: String,
  lattitude: String,
  longitude: String,
  description: String,
});

const dealtProperty = mongoose.model("Dealt Property", dealtPropertySchema);

const rentedPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  propertyName: String,
  locality: String,
  typeOfProperty: String,
  startingPrice: Number,
  propertyArea: String,
  photoLink: String,
  description: String,
});

const rentedProperty = mongoose.model("Rented Property", rentedPropertySchema);

const sellSchema = new mongoose.Schema({
  propertyId: Number,
  userId: Number,
  category: String,
});

const Sell = mongoose.model("Sell", sellSchema);

const buySchema = new mongoose.Schema({
  propertyId: Number,
  userId: Number,
  category: String,
});

const buy = mongoose.model("Buy", buySchema);

//-------------------------------------
// const stud = new St({
//   roll_no: 1001,
//   name: "Madison Hyde",
//   year: 3,
//   subjects: ["DBMS", "OS", "Graph Theory", "Internet Programming"],
// });
// stud.save().then(() => console.log("One entry added"));

// app.get('/api/customers', cors(), (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

app.get("/login", (req, res) => {
  res.json(user);
});

app.get("user", (req, res) => {
  res.json(user);
});

//a simple get request for property page
app.get("/property", authenticateToken, (req, res) => {
  res.json({ prize: "good" });
});

//for new user to register
app.post("/user", async (req, res) => {
  try {
    console.log(req.body);

    const usr = {
      _id: new ObjectID(),
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    };
    conn.collection("users").insertOne(usr);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//for first login
app.post("/login", async (req, res) => {
  const checkUser = await conn
    .collection("users")
    .find({ username: req.body.username })
    .toArray((err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data[0]);
      const accessToken = jwt.sign(data[0], process.env.ACCESS_TOKEN, {
        expiresIn: "60s",
      });
      const refreshToken = jwt.sign(data[0], process.env.REFRESH_TOKEN);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    });
});

//new accessToken when token expires using refreshtoken
app.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    delete user["iat"];
    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: "60s",
    });
    return res.json({ accessToken: newAccessToken });
  });
});

//middleware function for authentication to be done before every request
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);

// ********* USER TABLE *****
// userID
// name
// username
// password

// ******* RENT POPERTY *****
// propertyID
// property name
// locality
// type of prperty (like 2bhk, land, office)
// starting price
// area
// photo link
// lattitude
// longitude
// description

// ********* BUY PROPERTY *******
// propertyID
// property name
// locality
// type of prperty (like 2bhk, land, office)
// starting price
// area
// photo link
// lattitude
// longitude
// description

// ********** SELL TABLE *********
// propertyID
// userID

// ********* RENT TABLE *********
// propertyID
// userID
