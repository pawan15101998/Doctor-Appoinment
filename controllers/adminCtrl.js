const doctorModel = require('../models/doctorModel') 
const userModel = require('../models/userModel')


const getAllUsersController = async (req, res)=>{
    console.log("sdhb")
    try {
        const users = await userModel.find({});
        res.status(200).send({
            sucess: true,
            message: "users data",
            data: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "error from get all users",
            error
        })
    }
}
const getAllDoctorController = async(req, res) =>{
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            sucess: true,
            message: "users data",
            data: doctors   
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: "error from get all doctors",
            error
        })
    }
}

const changeAccStatus = async(req, res)=>{
    // console.log("sssss"+ req.body)       
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})   
        const user = await userModel.findOne({_id:doctor.userId});
        const notification = user.notification; 
        notification.push({
            type:"doctor-account-requested-updates",            
            message: `Your Doctor Account request has ${status}`,
            onClickPath:'/notification' 
        }); 
        user.isDoctor = status === "Approved" ? true: false;
        await user.save().then((val)=>{

        });  
        res.status(201).send({
            sucess: true,
            message: "Account Status Updated",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "error from changeAccStatus",
            error
        })
    }
}



module.exports = {getAllDoctorController, getAllUsersController, changeAccStatus};