const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appoinmentModel = require('../models/appoinmentModel');
const moment = require('moment')

// register
const registerController = async (req, res) =>{
    console.log(req.body);
    try {
        const exisitingUser = await userModel.findOne({email: req.body.email});
        if(exisitingUser){          
            return res.status(200).send({message: 'user already exist', sucess: false})
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        req.body.password = hashpassword;
        const newUser = new userModel({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
        });
        await newUser.save();
        res.status(200).send({sucess: true, message:"User Register sucessfully"})

    } catch (err) {
        console.log(err);
        res.status(500).send({sucess: false, message:`Register Controller ${err.message}` })
    }
};

// login
const loginController = async(req, res) =>{
    try {
        const user = await userModel.findOne({email: req.body.email});
        if(!user){
            res.status(200).send({sucess: false, message: "user not found"});
        }
        const isMatch = bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            res.status(200).send({sucess: false, message: "Invalid Email or Password"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).send({message: "Login Sucess", sucess: true, token})
    } catch (err) {
        console.log(err);
        res.status(500).send({sucess: false, message:`error message ${err}`.bgRed.white})
    }
};

const authController = async (req, res)=>{
    try {
        const user = await userModel.findById({_id: req.body.userId});
        user.password = undefined
        if(!user){
            res.status(200).send({
                message: "user not found",
                sucess: false
            })
        }else{
            res.status(200).send({
                sucess: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth err",
            sucess: false, 
            error
        })
    }
}

// apply doctor 
const applydoctorController = async (req, res)=>{
    console.log("shhjs")
    console.log({...req.body})
    try {
        const newDoctor = await doctorModel({...req.body, status: 'pending'});
        await newDoctor.save();         
        const adminUser = await userModel.findOne({isAdmin: true});
        const notification = adminUser.notification;
        notification.push({
            type:"Apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for the doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " +  newDoctor.lastName,
                onClickPath:"/admin/docotrs"
            }
        });
       await userModel.findByIdAndUpdate(adminUser._id, {notification})
        res.status(201).send({
            sucess: true,
            message:"Doctor Account Apply Sucessfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            error,
            message: "Error while applying for doctor"
        })
    }
}

const getAllNotificationController = async (req, res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = []
        user.seennotification = notification            
        const updateUser = await user.save();
        console.log("kkkkkkk")
        console.log(seennotification)
        res.status(200).send({
            sucess: true,
            message: 'all notification mark as read',
            data: updateUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error in notification",
            sucess: false,
            error
        })
    }
}

// get all doctor

const getAllDoctorsController = async (req, res)=>{
    try {
        const doctor = await doctorModel.find({status:'Approved'})
        console.log(doctor)
        res.status(200).send({
            sucess: true,
            message:"Doctors list featch Sucessfully",
            data:doctor
        })
    } catch (error) {
        res.status(500).send({
            sucess: false,
            error,
            message:"error while featching doctor"
        })
    }
}

//book appointment
const boookApointmentController = async(req, res)=>{
    console.log("req.body.data")
    console.log(req.body.date)
    console.log(req.body.time)
    console.log(moment(req.body.date, "DD-MM-YYYY"))
    console.log(moment(req.body.time, "HH:mm"))
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString()
        req.body.status = "pending"
        const newAppointment = new appoinmentModel(req.body)
        await newAppointment.save();
        const user = await userModel.findOne({_id:req.body.doctorInfo.userId})
        console.log("User milka ky"+user)
        user.notification.push({
            type:"New-Appointment-request",
            message:`A new Appointment request from ${req.body.userInfo.name}`,
            onClickPath:"/user/appointment"
        });
        await user.save();
        res.status(200).send({
            sucess: true,
            message:"Appointment booking Sucessfully"
        });
    } catch (error) {
       console.log(error) 
       res.status(500).send({
        sucess:false,
        error,
        message:"Error while booking Appointment"
       })
    }
}
// bookingAvaliblityController
const bookingAvaliblityController = async(req, res)=>{
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, "HH:mm").add(1, 'hours').toISOString()
        const doctorId = req.body.doctorId
        const appoinment = await appoinmentModel.find({doctorId, 
        date,
        time:{
            $gte: fromTime, $lte: toTime
        }
        })
        if(appoinment.length >0){
            return res.status(200).send({
                message:"Appoinment not Avalible at this time",
                sucess: true
            })
        }else{
            return res.status(200).send({
                sucess: true,
                message: "Appoinment Available"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message: "Error in booking"
        })
    }
}

const userAppointmentsController =async(req, res)=>{
    try {
        const appointments = await appoinmentModel.find({userId: req.body.userId})
        res.status(200).send({
            sucess: true,
            message: "User Appoinment featch sucessfully",
            data:appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message: "errror in user appoinment"
        })
    }
}

module.exports = {
    loginController, 
    registerController, 
    authController, 
    applydoctorController, 
    getAllNotificationController, 
    getAllDoctorsController, 
    boookApointmentController, 
    bookingAvaliblityController,
    userAppointmentsController
};