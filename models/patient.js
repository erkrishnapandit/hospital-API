// Requring mongoose
const mongoose = require("mongoose");

// Creating patient schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Provide Patient Name"],
    unique: true,
  },
  // Creating report Array
  reports: [
    {
      status: {
        type: String,
        // require: true,
        enum: [
          "Negative",
          "Traveled-Quarantine",
          "Symptoms-Quarantine",
          "Positive-Admit",
        ],
      },
      date: {
        type: Date,
        // require: true,
      },
    },
  ],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    // required: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
