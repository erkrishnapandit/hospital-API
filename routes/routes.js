// Requiring Express
const express = require("express");

// importing controllers form user Controller file
const {
  registerDoctor,
  registerPatient,
  creatReport,
  all_reports,
  AllReports,
  createSession,
} = require("../controllers/userControllers.js");

// importing passport from config directry.
const passport = require("../config/passport.js");

// Defining router
const router = express.Router();

// Post request to register doctor
router.post("/doctors/register", registerDoctor);

// Post request to login doctor
router.post("/login", createSession);

// post request to register patient
router.post(
  "/patients/register",
  passport.authenticate('jwt',{session:false}),
  registerPatient,
);

// post request to create report
router.post("/patients/:id/create-reports", passport.authenticate('jwt', {session: false}), creatReport);

// Get request to get the all report of any particul patient
router.get("/patients/:id/all-reports", all_reports);

// Get request to get report filter by status
router.get("/reports/:status", AllReports);

// Exporting router module
module.exports = router;
