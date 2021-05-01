var express = require('express');
var router = express.Router();
const verifyToken = require("../VerifyToken");

const bookingController = require("../controller/booking_controller")

router.post('/create', bookingController.bookHotel);
router.get('/getBookings', bookingController.getBookings);
// router.get('/getBookings', (req, res) => res.send({ "data": 200 }));

module.exports = router;
