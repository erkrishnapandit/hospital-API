// Requiring mongoose
const mongoose = require('mongoose');

// Creating Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please Enter Your Name"],
    },
    password: {
        type: String,
        required: [true, "Please Entr Your Password"],
        minLength: [6,"Password should be grater then 6 characters"],
    },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

// Exporting module
module.exports = Doctor;