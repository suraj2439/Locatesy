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
const { log } = require("console");

let count = 0;

mongoose.connect("mongodb://localhost/locatesy-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var conn = mongoose.connection;

const app = express();

app.use(cors());
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

// all the properties which are given on rent
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

// all the properties which are on sell(need to buy by other person)
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

// all the propeties which are dealt (remove from buy properties and put here)
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

// properties which are taken on rent
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

// prperty and seller relationship
const sellSchema = new mongoose.Schema({
  p_id: Number,
  userId: String,
  category: String, // rent or direct sold
});

const Sell = mongoose.model("Sell", sellSchema);

// property and buyer relationship
const buySchema = new mongoose.Schema({
  p_id: Number,
  userId: String,
  category: String, // rent or direct bought
});

const buy = mongoose.model("Buy", buySchema);

// let obj = {}
//   obj["p_id"] = 17;
//   obj["userId"] = "smy";
//   obj["category"] = "buy";

//   const buyP = new buy(obj);

//   buyP
//     .save()
//     .then((res) => console.log("One entry added"))
//     .catch((err) => console.log(err));

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
  rand = Math.floor(rand * difference);

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

app.get("/buyproperties", cors(), (req, res) => {
  conn
    .collection("buy properties")
    .find()
    .toArray((err, data) => {
      res.json(data);
    });
});

app.get("/rentproperties", cors(), (req, res) => {
  conn
    .collection("rent properties")
    .find()
    .toArray((err, data) => {
      res.json(data);
    });
});

app.get("/profile", async (req, res) => {
  let type = req.query.type;
  let endpt1, endpt2, condn;
  if (type === "bought") {
    endpt1 = "buys";
    endpt2 = "buy properties";
    condn = { category: "buy" };
  } else if (type === "sold") {
    endpt1 = "sells";
    endpt2 = "buy properties";
    condn = { category: "sell" };
  } else if (type === "onrent") {
    endpt1 = "sells";
    endpt2 = "rent properties";
    condn = { category: "rent" };
  } else if (type === "rented") {
    endpt1 = "buys";
    endpt2 = "buy properties";
    condn = { category: "rent" };
  } else res.status(400).send();
  console.log(endpt1, endpt2, condn, req.query.userName);

  conn
    .collection(endpt1)
    .find({ $and: [{ userId: req.query.userName }, condn] })
    .project({ p_id: 1, _id: 0 })
    .toArray(async (err, data) => {
      console.log(data);
      let result = [];
      for (let i = 0; i < data.length; i++) {
        let property = await conn
          .collection(endpt2)
          .findOne({ p_id: data[i].p_id });
        console.log(property);
        if (property !== null)
          result.push([
            property.name,
            property.location,
            property.propertyType,
            property.rooms,
            property.areaType,
            property.basePrice,
            property.possession,
          ]);
      }
      res.json(result);
    });
});

//for new user to register
app.post("/user", cors(), async (req, res) => {
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
app.post("/login", cors(), async (req, res) => {
  console.log();
  const checkUser = await conn
    .collection("users")
    .find({ username: req.body.username })
    .toArray((err, data) => {
      if (err || data.length == 0) {
        console.log(err);
        res.status(403).send();
        console.log("okkk");
      } else {
        console.log(data + "uuu");
        const accessToken = jwt.sign(data[0], process.env.ACCESS_TOKEN, {
          expiresIn: "60s",
        });
        const refreshToken = jwt.sign(data[0], process.env.REFRESH_TOKEN);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      }
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

app.post("/razorpay", cors(), async (req, res) => {
  console.log("hiiii");
  const payment_capture = 500;
  const amount = 500;
  const currency = "INR";
  console.log("hiiii");
  const options = {
    amount: 50000,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };
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

app.post("/register", cors(), async (req, res) => {
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

app.post("/registerProperty", cors(), async (req, res) => {
  try {
    // const doesUserExist = await User.exists({ username: req.body.username });

    // if (doesUserExist) {
    //   res.status(409).send();
    // }
    console.log("hello");
    const pid = 4000 + Math.floor(Math.random() * 1000);
    const usr = {
      p_id: pid,
      _id: new ObjectID(),
      name: req.body.name,
      location: req.body.location,
      propertyType: req.body.propertyType,
      rooms: req.body.rooms,
      priceRange: req.body.priceRange,
      areaRange: req.body.areaRange,
      areaType: req.body.areaType,
      basePrice: req.body.basePrice,
      descr: req.body.descr,
      status: req.body.status,
      possession: req.body.possession,
    };

    const usrProp = {
      p_id: pid,
      userId: req.body.username,
      category: req.body.type,
    };
    conn.collection("buy properties").insertOne(usr);
    conn.collection("sells").insertOne(usrProp);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/paymentdone", cors(), async (req, res) => {
  console.log(req.body);
  const obj = {
    p_id: parseInt(req.query.p_id),
    userId: req.query.un,
    category: req.query.type,
  };

  conn.collection("buys").insertOne(obj);

  res.redirect("http://127.0.0.1:3000/");
  //res.sendStatus(200);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
