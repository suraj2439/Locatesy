require("dotenv").config();
const fs = require("fs");
// import csv from "./client/public/ldata.csv"
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectId;
const axios = require("axios");

const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");

let count = 0;

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
//   name: "suraj",
//   username: "suraj",
//   password: "1234"
// });
// stud.save().then(() => console.log("One entry added"));

const rentPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  link: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
});

const rentProperty = mongoose.model("Rent Property", rentPropertySchema);

const buyPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  link: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
});

const buyProperty = mongoose.model("Buy Property", buyPropertySchema);

const dealtPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  link: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
});

const dealtProperty = mongoose.model("Dealt Property", dealtPropertySchema);

const rentedPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  link: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
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

csv = fs.readFileSync("./client/public/ldata.csv");
var array = csv.toString().split("\r");
let csvData = [];
let headers = array[0].split(",");
for (let i = 1; i < array.length - 1; i++) {
  let obj = {};
  let str = array[i];
  let s = "";

  let flag = 0;
  for (let ch of str) {
    if (ch === '"' && flag === 0) {
      flag = 1;
    } else if (ch === '"' && flag == 1) flag = 0;
    if (ch === "," && flag === 0) ch = "|";
    if (ch !== '"') s += ch;
  }
  let properties = s.split("|");
  if (properties.length !== headers.length) continue;

  for (let j in headers) {
    if (properties[j].includes(",")) {
      obj[headers[j]] = properties[j].split(",").map((item) => item.trim());
    } else obj[headers[j]] = properties[j];
  }

  csvData.push(obj);
}

function extractCost(costString) {
  let flag = false;
  let cost = costString;
  // console.log(cost)
  if (costString.length == 2) {
    cost = costString[0];
  }
  let tmp = "";
  if (cost.includes(" L")) tmp = cost.split(" L")[0];
  else {
    tmp = cost.split(" Cr")[0];
    flag = true;
  }

  if (tmp.includes("- ")) cost = tmp.split("- ")[1];
  else cost = tmp.split("₹ ")[1];
  if (cost == undefined) return null;

  let finalCost = parseFloat(cost);
  if (flag) {
    finalCost = finalCost * 100;
  }
  return finalCost;
}

function extractArea(areaString) {
  if (areaString.length <= 5) {
    let tmp = "";
    for (let m = 0; m < areaString.length; m++) tmp = tmp + areaString[m];
    areaString = tmp;
  }
  parea = areaString.slice(0, 10);

  if (parea.includes("-")) parea = parea.split("-")[0];
  else parea = parea.split(" sq")[0];

  return parseInt(parea);
}

function extractPriceRange(costString) {
  let res = "";
  let cost = costString;
  if (costString.length == 2) {
    cost = costString[0];
  }
  let tmp = "";
  if (cost.includes(" L")) {
    tmp = cost.split(" L")[0];
    res = tmp + " L";
  } else {
    tmp = cost.split(" Cr")[0];
    res = tmp + " Cr";
  }
  return res;
}

function extractAreaRangeType(areaString, flag) {
  tmp = areaString;
  if (areaString.length <= 5) {
    tmp = "";
    for (let m = 0; m < areaString.length; m++) tmp = tmp + areaString[m];
  }
  if (flag) return tmp.split(") ")[0] + ")";
  else return tmp.split(") ")[1];
}

function extractDescr(descrString) {
  tmp = descrString;
  if (descrString.length <= 10) {
    tmp = "";
    for (let m = 0; m < descrString.length; m++)
      tmp = tmp + descrString[m] + ", ";
  }
  return tmp;
}

let status = [
  "Under Construction",
  "Ready to Move",
  "New Launch",
  "Occupied",
  "Under Maintainance",
];
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function generateRandom(min = 0, max = 100) {

  // find diff
  let difference = max - min;

  // generate random number 
  let rand = Math.random();

  // multiply with difference 
  rand = Math.floor( rand * difference);

  // add with min value 
  rand = rand + min;

  return rand;
}


function getPropertyStatus() {
  return status[Math.floor(Math.random() * 4)];
}

function getPossession() {
  return (
    months[Math.floor(Math.random() * 11)] +
    " " +
    (2022 + Math.floor(Math.random() * 10)).toString()
  );
}

async function saveRecord(obj, address) {
  let tokenStr = "1emACL3rF0LsiOzctqvapbDKANM4u7GA";

  let res = "";
  try {
    res = await axios.get(
      "http://open.mapquestapi.com/geocoding/v1/address?key=" +
        tokenStr +
        "&location=" +
        address
    );
  } catch (ex) {
    return;
  }

  try {
    lat = parseFloat(res.data["results"][0]["locations"][0]["latLng"]["lat"]);
    lng = parseFloat(res.data["results"][0]["locations"][0]["latLng"]["lng"]);
  } catch (ex) {
    return;
  }

  obj["lat"] = lat;
  obj["lng"] = lng;

  obj.p_id = count;
  count += 1;
  console.log(count);
  const property = new rentProperty(obj);

  property
    .save()
    .then((res) => console.log("One entry added"))
    .catch((err) => console.log(err));
}

for (let j = 1; j < 1000 && false; j++) {
  let i = generateRandom(2000, 3500);

  obj = {};
  obj["link"] = csvData[i]["Image Link"].slice(
    1,
    csvData[i]["Image Link"].length
  );
  obj["name"] = csvData[i]["Name"];
  obj["location"] = csvData[i]["Location"];
  obj["propertyType"] = csvData[i]["Type"];
  obj["rooms"] = csvData[i]["Rooms"];
  obj["priceRange"] = extractPriceRange(csvData[i]["Avg Cost"]);
  obj["areaRange"] = extractAreaRangeType(csvData[i]["Area"], true);
  obj["areaType"] = extractAreaRangeType(csvData[i]["Area"], false);
  obj["avgCostNumeric"] = extractCost(csvData[i]["Avg Cost"]) * 1000;
  obj["areaNumeric"] = extractArea(csvData[i]["Area"]);
  let tt = generateRandom(2, 5);
  console.log("dsda", tt);
  obj["basePrice"] = obj["avgCostNumeric"] * generateRandom(2, 5);
  obj["descr"] = extractDescr(csvData[i]["Description"]);
  obj["status"] = getPropertyStatus();
  obj["possession"] = getPossession();
  try {
    saveRecord(obj, csvData[i]["Location"] + ", pune, maharashtra");
  } catch (ex) {
    console.log("Exception");
  }
}

// for(let i=0; i < 5; i++) {
//   saveRecord(result[i]["Location"] + ", pune, maharashtra")
// }

// function csvJSON(csv) {
//   const lines = csv.split('\n')
//   const result = []
//   const headers = lines[0].split(',')

//   for (let i = 1; i < lines.length; i++) {
//       if (!lines[i])
//           continue
//       const obj = {}
//       const currentline = lines[i].split(',')

//       for (let j = 0; j < headers.length; j++) {
//           obj[headers[j]] = currentline[j]
//       }
//       result.push(obj)
//   }
//   return result
// }

// propertyData = {"name" : "Parklane Lifeseasons", "propertyType" : "Residential Apartment", "rooms" : "2BHK",
// "location" : "Dhanori, Pune, Maharashtra", "latitude" : "24.53", "longitude" : "32.52",
// "priceRange" : "₹ 50.98 - 51.64 L", "areaRange" : "687 - 696 sq. ft.", "status": "Under Construction",
// "basePrice" : "7420 per sq. ft.", "areaType" : "Carpet Area", "possession" : "June 2025", "descr" : "Make Kanha Vrundavan Heritage your next home. Book your 1 BHK flat in Saswad, Pune. With a carpet area of 475.44 sq. ft., the flat combines the finest design and amenities in Pune to provide a living experience unlike any other. Here is an exclusive deal for you. Buy your 1 BHK flat for Rs. 25 Lac. It is a new launch p...less"}

// finalData = []
// fs.readFile('./client/public/ldata.csv', 'utf8' , (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   let csvData = csvJSON(data);
//   for(let i = 0; i < csvData.length; i++) {
//     obj = {}
//     obj["link"] = csvData[i]["Image Link"];
//     obj["name"] = csvData[i]["Name"];
//     obj["location"] = csvData[i]["Location"]
//     obj["propertyType"] = csvData[i]["Type"]
//     console.log(csvData[i])
//   }
// })

// console.log(csvJSON(csv))

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

app.get("/buyproperties", (req, res) => {
  conn
    .collection("buy properties")
    .find()
    .toArray((err, data) => {
      res.json(data);
    });
});

app.get("/rentproperties", (req, res) => {
  conn
    .collection("rent properties")
    .find()
    .toArray((err, data) => {
      res.json(data);
    });
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
        res.status(403).send();
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

const razorpay = new Razorpay({
  key_id: "rzp_test_r3oOK27ZCfkjJ3",
  key_secret: "KwtHRn68tCSXx1iJ1sexReC5",
});

app.post("/razorpay", async (req, res) => {
  console.log("hiiii");
  const payment_capture = 1;
  const amount = 1;
  const currency = "INR";
  console.log("hiiii");
  const options = {
    amount: 100,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  console.log("hiiii");
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const doesUserExist = await User.exists({ username: req.body.username });

    if (doesUserExist) {
      res.status(409).send();
    }
    console.log("hello");

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

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
