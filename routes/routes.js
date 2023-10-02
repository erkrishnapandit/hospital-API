const express = require("express");
const {registerDoctor, registerPatient, creatReport, all_reports, AllReports, login} = require("../controllers/userControllers.js");
const passport = require('../config/passport.js');

const router = express.Router();
router.post('/doctors/register', registerDoctor);

router.post('/login', login);

// router.post('/patients/register', passport.authenticate('jwt', {session: false}), registerPatient);
router.post('/patients/register', registerPatient);

// router.post('/patients/:id/create_reports', passport.authenticate('jwt', {session: false}), creatReport);
router.post('/patients/:id/create_reports', creatReport);

router.get('/patients/:id/all_reports', all_reports);

router.get('/reports/:status', AllReports);



module.exports = router;