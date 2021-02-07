


const express             =  require('express');
const router              =  express.Router();

const bookingValidator    = require('./validator/bookingValidator');
const bookingController   = require('./controller/bookingController');
const userAuth            = require('./../auth/user_auth');
const multipartMiddleware = multipart();

router.post('./book_fuel_filling',                          bookingValidator.bookFuelFilling, userAuth.authenticateUser , bookingController.bookFuelFilling)
router.post('./get_user_data',                              bookingValidator.getUserData,     userAuth.authenticateUser , bookingController.getUserData)
router.post('./file_upload',        multipartMiddleware,    bookingValidator.fileUpload,      userAuth.authenticateUser , bookingController.fileUpload)

