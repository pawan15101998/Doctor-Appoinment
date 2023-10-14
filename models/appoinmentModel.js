const mongoose = require('mongoose')

const appoinmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    doctorId:{
        type:String,
        require: true
    },
    doctorInfo:{
        type:String,
        require: true
    },
    userId:{
        type:String,
        require: true
    },
    date:{
        type:String,
        require: true
    },
    status:{
        type:String,
        require: true,
        default:"pending"
    },
    time:{
        type:String,
        require: true
    }
}, {timestamps: true})

const appoinmentModel = mongoose.model('appointments', appoinmentSchema)

module.exports = appoinmentModel;