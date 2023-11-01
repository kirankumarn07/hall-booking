const express = require('express')
const HallController = require('../controller/hall')
const router = express.Router()

router.get('/', HallController.getDetails)
router.get('/rooms/all',HallController.getAllRooms)
router.post('/rooms/create',HallController.createRoom)
router.post('/booking/create/:id',HallController.bookingRoom)
router.get('/viewbooking',HallController.getAllBookedRooms)
router.get('/customers',HallController.getAllCustomers)
router.get('/customer/:name',HallController.getBookingCountByCustomer)


module.exports = router