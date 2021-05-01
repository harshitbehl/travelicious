const mongoose = require("mongoose")
require("../model/booking_model")
const bookingSchema = mongoose.model("bookingSchema");
const hotelSchema = mongoose.model("hotelSchema");

const sendJSONresponse = function (res, status, content) {
    console.log("\n\n\nSending booking response")
    res.status(status).json(content);
}
const interalServerError = res => sendJSONresponse(res, 500, "Internal Server Error");

/**
 * [POST] : '/booking/create'
 *  @param username
 *  @param hotelId
 *  @param hotelId
 *  @param checkInDate
 *  @param checkOutDate
 *  @returns object with bookingId
 */
module.exports.bookHotel = async (req, res) => {

    console.log("Inside bookHotel for country");
    const newBooking = {
        username: req.body.username,
        hotelId: req.body.hotelId,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
    }
    bookingSchema.create(newBooking, (err, insertedBooking) => {
        if (err)
            sendJSONresponse(res, 200, err);

        insertedBooking.bookingId = insertedBooking._id
        sendJSONresponse(res, 200,
            {
                "Message": "Booking created successfully.",
                "bookingId": insertedBooking.bookingId
            })
    })
}


/**
 * [GET] : '/booking/getBookings'
 * @param username
 */

module.exports.getBookings = async (req, res) => {

    // interalServerError(res);
    const USERNAME = req.query.username;
    console.log("Inside getBookings for user " + USERNAME);
    const query = { 'username': USERNAME }

    bookingSchema.find(query, async (err, bookings) => {
        if (err) interalServerError();

        const hotelDetails = await Promise.all(
            bookings.map(async (booking) => await hotelSchema.findOne({ "hotelId": booking.hotelId })
            )
        )
        bookingsWithHotelDetails = bookings.map((booking, i) => {
            return {
                "username": booking.username,
                "hotelId": booking.hotelId,
                "checkInDate": booking.checkInDate,
                "checkOutDate": booking.checkOutDate,
                "hotelLocation": hotelDetails[i].hotelLocation,
                "hotelCountry": hotelDetails[i].hotelCountry,
                "hotelProvince": hotelDetails[i].hotelProvince,
                "hotelImage": hotelDetails[i].hotelImage,
                "hotelId": hotelDetails[i].hotelId,
                "hotelRating": hotelDetails[i].hotelRating,
            }
        })
        // console.log(bookingsWithHotelDetails);
        sendJSONresponse(res, 200, { resultSize: bookings.length, bookings: bookingsWithHotelDetails });
    })
}
