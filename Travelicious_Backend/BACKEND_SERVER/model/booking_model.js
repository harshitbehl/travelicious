const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        checkInDate: {
            type: String,
            require: true,
        },
        checkOutDate: {
            type: String,
            require: true,
        },
        bookingId: {
            type: String,
            require: true,
        },
        hotelId: {
            type: String,
            require: true
        }
    }
);
mongoose.model('bookingSchema', bookingSchema)
