const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentController, updateStatusController} = require('../controllers/doctorCtr')
const router = express.Router()


router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)


router.post('/updateProfile', authMiddleware, updateProfileController)


router.post('/getDoctorById', authMiddleware, getDoctorByIdController)


router.get('/doctor-appointment', authMiddleware, doctorAppointmentController)


router.post('/update-status', authMiddleware, updateStatusController)

module.exports = router