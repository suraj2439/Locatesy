var mongoose = require("mongoose");

const buyPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  link : String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType : String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number
});

const buyProperty = mongoose.model("Buy Property", buyPropertySchema);

obj = {
  p_id: 1, link : "https://mediacdn.99acres.com/media1/16148/11/322971380M-1633938235990", 
  name: "Kanha Vrundavan Heritage",
  location : "Saswad", 
  propertyType: "Apartment", 
  rooms: "1 BHK", 
  priceRange : "₹ 25 L",
  areaRange : "475 sq.ft. (44 sq.m.)", 
  areaType: "Carpet Area",
  avgCostNumeric :2500000, 
  areaNumeric :475,
  basePrice: "5263.16 per sq.ft.", 
  descr :"Make Kanha Vrundavan Heritage your next home. Book your 1 BHK flat in ...",
  status : "Ready to Move",
  possession: "April 2029",
}
property = new buyProperty(obj)

property.save();
property.save();

