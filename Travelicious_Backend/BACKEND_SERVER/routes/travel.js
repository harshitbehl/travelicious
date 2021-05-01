var express = require('express');
var router = express.Router();
const verifyToken = require("../VerifyToken");

const travelController = require('../controller/travel_controller');
const { Router } = require('express');

router.get("/getHotelsByCountry", verifyToken, travelController.getHotelsByCountry);
router.get("/getHotelsByProvince", verifyToken, travelController.getHotelsByProvince);
router.get("/getHotelsByCountryAndMinimumStars", verifyToken, travelController.getHotelsByCountryAndMinimumStars);
router.get('/flights', travelController.getFlightInfo);
//router.get('/flightone', travelController.getinfo);

module.exports = router;


