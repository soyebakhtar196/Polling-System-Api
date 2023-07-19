//Mongoose Configuration
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Soyeb-Akhtar:GY1cdOCyps0s2ZIa@polling-api.jsbrla1.mongodb.net/?retryWrites=true&w=majority"
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting database ..."));

db.once("open", () => console.log(`Successfully connected to ${db.name}`));

module.exports = db;
