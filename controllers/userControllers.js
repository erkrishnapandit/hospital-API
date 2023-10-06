const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");

module.exports.registerDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    return res.status(200).json({
      success: true,
      message: "Doctro created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "couldn't create doctor, Internal server error",
    });
  }
};

module.exports.createSession = async (req, res) => {
  try {
    let user = await Doctor.findOne({ name: req.body.name });

    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid UserName or Password",
      });
    }

    return res.status(200).json({
      message: "Sign in successful. Here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "secret", { expiresIn: "1d" }),
      },
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.registerPatient = async (req, res) => {
  try {
    const doctorID = req?.user.id;
    console.log(doctorID);
    const patient = await Patient.create({
      name: req.body.name,
      reports:[],
      doctor: doctorID,
    });
    res.status(200).json({
      success: true,
      message: "Patient created successfully",
      patient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "couldn't create patient, Internal server error",
    });
  }
};

module.exports.creatReport = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    req.body.date = Date.now();

    patient.reports.push(req.body);
    patient.save();
    res.status(200).json({
      success: true,
      message: "Report Submitted Successfully",
      patient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Couldn't Creat report, Internal Server Error",
    });
  }
};

module.exports.all_reports = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json({
      success: true,
      reports: patient.reports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Couldn't Fetch Patient Report, Error In Getting patient Report",
    });
  }
};

module.exports.AllReports = async (req, res, next) => {
  try {
    const patient = await Patient.find({
      reports: {
        $elemMatch: {
          status: req.params.status,
        },
      },
    });
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.log(AllReports);
    res.status(500).json({
      success: false,
      message: "Couldn't Find Report",
    });
  }
};
