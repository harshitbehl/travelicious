const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema(
    {
        hotelName: {
            type: String,
            require: true,
        },
        hotelLocation: {
            type: String,
            require: true
        },
        hotelCountry: {
            type: String,
            require: true
        },
        hotelProvince: {
            type: String,
            require: true
        },
        hotelImage:{
            type : String
        },
        hotelId: {
            type: String,
            require: true
        },
        hotelRating: {
            type: Number,
            require: true
        },
        roomsInHotels: {
            type: Number,
            require: true
        }
    }
);
mongoose.model('hotelSchema', hotelSchema)
