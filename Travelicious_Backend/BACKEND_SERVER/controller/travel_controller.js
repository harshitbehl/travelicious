const { query } = require("express");
const { InsufficientStorage } = require("http-errors");
const mongoose = require("mongoose")
require("../model/hotel_model")
const hotelSchema = mongoose.model("hotelSchema");
const request = require('request');

const sendJSONresponse = function (res, status, content) {
    console.log("\n\n\nSending travel response")
    res.status(status).json(content);
}

const interalServerError = res => sendJSONresponse(res, 500, "Internal Server Error");

/**
 * [GET] "/travel/getHotelsByCountry"
 * @param country 
 */
module.exports.getHotelsByCountry = async (req, res) => {

    const QUERY_COUNTRY = req.query.country;
    console.log("Inside getHotelsByCountry for country " + QUERY_COUNTRY);
    const query = { 'hotelCountry': new RegExp(`^${QUERY_COUNTRY}$`, 'i') }
    hotelSchema.find(query, (err, docs) => {
      
        if (err) {
            interalServerError();
            console.log("bvn");
        }
        console.log(docs);
        sendJSONresponse(res, 200, { resultSize: docs.length, hotels: docs });
    })
}

/**
 * [GET] "/travel/getHotelsByProvince"
 * @param province 
 */
 module.exports.getHotelsByProvince = async (req, res) => {
    const QUERY_PROVINCE = req.query.province;
    console.log("Inside getHotelsByCountry for country " + QUERY_PROVINCE);
    const query = { 'hotelProvince': new RegExp(`^${QUERY_PROVINCE}$`, 'i') }
    hotelSchema.find(query, (err, docs) => {

        if (err) interalServerError();
        console.log(docs);
        sendJSONresponse(res, 200, { resultSize: docs.length, hotels: docs });
    })
    
}
/**
 * [GET] "/travel/getHotelsByCountryAndMinimumStars"
 * @param country 
 * @param min_stars
 */
module.exports.getHotelsByCountryAndMinimumStars = async (req, res) => {

    const QUERY_COUNTRY = req.query.country;
    const QUERY_MIN_STARS = req.query.min_stars
    console.log("Inside getHotelsByCountryAndMinimumStars for country=" + QUERY_COUNTRY + " with stars=" + QUERY_MIN_STARS);
    const query = {
        $and: [
            { 'hotelCountry': new RegExp(`^${QUERY_COUNTRY}$`, 'i') },
            { 'hotelRating': { $gte: QUERY_MIN_STARS } }
        ]
    }
    hotelSchema.find(query, (err, docs) => {

        if (err) interalServerError();
        console.log(docs);
        sendJSONresponse(res, 200, { resultSize: docs.length, hotels: docs });
    })
}

module.exports.getFlightInfo = async (req, res) => {
    
    const QUERY_FLIGHT = req.query.country
    const options = {
        method: 'GET',
        url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
        qs: {query: QUERY_FLIGHT},
        headers: {
            'x-rapidapi-key': '5004bc8afdmshd43c0963cf3f3c1p13863ajsn86851c8db499',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            useQueryString: true
        }
    };





/**
 * Random data generator - not exposed
*/
module.exports.getsome = async function (req, res) {

    console.log("Inside getsome method")
    countries = ["Russia", "Canada", "United States", "China", "Brazil", "Australia", "India", "Argentina"]

    for (i = 0; i < 500; i++) {
        alphabet = (i + 10).toString(36).toUpperCase()
        random_number = parseInt(Math.random() * 100)
        console.log(random_number % countries.length)
        var newHotel = {
            hotelName: "Hotel " + alphabet,
            hotelLocation: "Some random location " + alphabet,
            hotelCountry: countries[random_number % countries.length],
            hotelId: Math.random().toString(),
            hotelRating: parseInt(random_number * 10 % 6),
            roomsInHotels: parseInt(random_number)
        }
        if (newHotel.hotelRating == 0)
            newHotel.hotelRating = 5;

        await hotelSchema.create(newHotel, (err, hotel) => {
            if (err) {
                console.log(err)
                sendJSONresponse(res, 200, err);
            }
            console.log(hotel);
        })
    }
    sendJSONresponse(res, 200, { message: 'Random data generated' });
};


    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.status(200).json(response.body);
    });
}

module.exports.getinfo = async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://priceline-com.p.rapidapi.com/flights/BOM/YYZ/2021-02-17',
        qs: {adults: '1'},
        headers: {
          'x-rapidapi-key': '5004bc8afdmshd43c0963cf3f3c1p13863ajsn86851c8db499',
          'x-rapidapi-host': 'priceline-com.p.rapidapi.com',
          useQueryString: true
        }
      };
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
      
          console.log(body);
      });
}

