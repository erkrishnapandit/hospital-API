const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const jwt = require('jsonwebtoken');

module.exports.registerDoctor = async(req, res) =>{
    try{
        const doctor = await Doctor.create(req.body);
        res.status(200).json({
            success: true,
            message: "Doctro created successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "couldn't create doctor, Internal server error",
        })

    }
}

module.exports.login = async (req, res)=>{
    try{

        const user = Doctor.find(req.body);

        if(user){
            const token = jwt.sign(user.id, "secret");
            res.status(200).json({
                success: true,
                token,
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Invalid Username or Password"
            })
        }

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Couldn't login, Something Went Wrong"
        })
    }
}

module.exports.registerPatient = async (req, res) => {
    try{
        req.body.doctor = "6512739c28a1c30e5e80a84c";
        const patient = await Patient.create(req.body);
        res.status(200).json(
            {
                success: true,
                message: "Patient created successfully"
            }
        )
    }catch(error){
        res.status(500).json(
            {
                success: false,
                message: "couldn't creat patient, Internal server error"
            }
        )
    }
}

module.exports.creatReport = async (req, res) =>{
    try{
        const patient = await patient.findById(req.params.id);

        req.body.date = Date.now();

        patient.reports.push(req.body);
        patient.save();
        res.status(200).json({
            success: true,
            message: "Report Submitted Successfully"
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Couldn't Creat report, Internal Server Error"
        })
    }
}                                              


module.exports.all_reports = async(req, res)=>{
    try{
        const patient = await patient.findById(req.params.id);
        res.status(200).json({
            success: true,
            reports: patient.reports,
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Couldn't Fetch Patient Report, Error In Getting patient Report"
        })
    }
}

module.exports.AllReports = async (req, res, next)=>{
    try{

        const patient = await patient.find({
            reports: {$elemMatch: {
                status: req.params.status
            }},
        });
        res.status(200).json({
            success: true,
            data: patient,
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Couldn't Find Report"
        })
    }
}