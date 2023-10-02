const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Honeshwar:cAs8Q7hDGiFzijcU@cluster0.o5zojlu.mongodb.net/?retryWrites=true&w=majority",
); //.then(() => {
//     console.log("Successfully connecting with mongoodb")
// }).catch(() => {
//     console.log("Error in connecting with mongoodb")
// });

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "error in connecting with mongoodb"),
);
db.once("open", () => {
  console.log("Successfully connecting with mongoodb");
});

module.exports = db;
