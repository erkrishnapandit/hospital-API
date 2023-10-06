const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://krishna_pandit:G89dgkl5Pt9rYXIA@clustercodingninjas.h5erjpx.mongodb.net/?retryWrites=true&w=majority'); //.then(() => {
const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "error in connecting with mongoodb"),
);
db.once("open", () => {
  console.log("Successfully connecting with mongoodb");
});

module.exports = db;
