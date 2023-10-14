const appoinmentModel = require("../models/appoinmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getDoctorInfoController = async(req, res)=>{
    console.log("kjkreq")
    // console.log(req)
    // console.log(req.body.userId)
    try {
        const doctor = await doctorModel.findOne({userId : req.body.userId})
        console.log(doctor)
        res.status(200).send({
            sucess:true,
            message:"doctor data fetch sucessfully",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: true,
            error,
            message: "Error in fetching Details"
        })
    }
};

const updateProfileController = async(req, res)=>{
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body)
        res.status(200).send({
            sucess: true,
            message:"Doctor Profile Update",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message:"Doctor Profile Upadte issue",
            error
        })
    }
} 

const getDoctorByIdController =async(req, res)=>{
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId})
        res.status(200).send({
            sucess: true,
            message:"Single doctor info featch",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message:"error in single doctor"
        })
    }
}

const doctorAppointmentController = async(req, res)=>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        const appointmenmt = await appoinmentModel.find({doctorId: doctor.id})
        res.status(200).send({
            sucess: true,
            message: "Doctor Apppointment fetch Sucessfully",
            data: appointmenmt
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message: "error in doc appoinment"
        })
    }
}

const updateStatusController = async(req, res)=>{
    try {
        const {appointmentId, status} = req.body
        const appointments = await appoinmentModel.findByIdAndUpdate(appointmentId, {status})
        const user = await userModel.findOne({_id:appointments.userId})
        const notification = user.notification;
        notification.push({
            type:"status Updateed",
            message:`your Appointment has been updated ${status}`,
            onClickPath:"/doctor-appointment"
        });
        await user.save();
        res.status(200).send({
            sucess: true,
            message:"Appointment Status updated",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message:"error in update status"
        })
    }
}
module.exports = {getDoctorInfoController,doctorAppointmentController, updateProfileController, getDoctorByIdController, updateStatusController}