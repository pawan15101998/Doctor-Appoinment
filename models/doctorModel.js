const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    firstName:{
        type: String,
        required: [true, "First name is required"],
    },
    lastName:{
        type: String,
        required: [true, "last name is required"],
    },
    phone:{
        type: Number,
        required: [true, "Number is required"],
    },
    email:{
        type: String,
        required: [true, "email is required"],
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    specilization:{
        type: String,
        required: [true, "specilization is required"]
    },
    experience: {
        type: String,
        required: [true, "experience is required"]
    },
    feesPerConsaltation: {
        type: Number,
        required: [true, "fees is required"]
    },
    status:{
        type: String,
        default: "pending"
    },
    timing:{
        type: Object,
        required: [true, "work timing is required"]
    },
},
{timestamps: true}
);
const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports   = doctorModel;