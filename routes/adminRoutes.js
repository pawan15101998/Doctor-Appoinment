const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const {getAllUsersController, getAllDoctorController, changeAccStatus} = require('../controllers/adminCtrl');


// get method get all user
router.get('/getalluser', authMiddleware, getAllUsersController);

// get all doctor controller    
router.get('/getalldoctors', authMiddleware, getAllDoctorController);

// change account status
router.post('/changeAccStatus', authMiddleware, changeAccStatus);


module.exports = router