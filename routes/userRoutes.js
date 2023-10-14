const express = require('express');
const { 
    loginController, 
    registerController, 
    authController, 
    applydoctorController,
    getAllNotificationController,
    getAllDoctorsController,
    boookApointmentController,
    bookingAvaliblityController,
    userAppointmentsController
 } = require('../controllers/userCtr');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

// routes

// login
router.post('/login', loginController)

// register
router.post('/register', registerController)

// auth
router.post('/getuserdata', authMiddleware, authController)

// apply doctor
router.post('/apply-doctor', authMiddleware, applydoctorController)

// apply for doctor notification
router.post('/get-all-notification', authMiddleware, getAllNotificationController)

// get all doc
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//Bookappoinment
router.post('/book-apointment', authMiddleware, boookApointmentController)

// booking Avaliblity
router.post('/booking-avaliblity', authMiddleware, bookingAvaliblityController)

//  appoinment list
router.get('/user-appointments', authMiddleware, userAppointmentsController)




module.exports = router;