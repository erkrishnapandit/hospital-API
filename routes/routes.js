const express = require("express");
const {
  registerDoctor,
  registerPatient,
  creatReport,
  all_reports,
  AllReports,
  createSession,
} = require("../controllers/userControllers.js");
const passport = require("../config/passport.js");

const router = express.Router();
router.post("/doctors/register", registerDoctor);

router.post("/login", createSession);
// router.get("/", (req, res) =>
//   res.status(200).json({ message: "successfully" }),
// );
// router.post('/patients/register', passport.authenticate('jwt', {session: false}), registerPatient);
router.post(
  "/patients/register",
  passport.authenticate('jwt',{session:false}),
  registerPatient,
);

// router.post('/patients/:id/create_reports', passport.authenticate('jwt', {session: false}), creatReport);
router.post("/patients/:id/create-reports", passport.authenticate('jwt', {session: false}), creatReport);

router.get("/patients/:id/all-reports", all_reports);

router.get("/reports/:status", AllReports);

module.exports = router;
