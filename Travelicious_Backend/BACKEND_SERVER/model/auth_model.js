const mongoose = require('mongoose');

const authSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        phonenumber: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        },
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return /[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        }, username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    }
);
//  mongoose.model('credential' , loginSchema , 'credentials'  );
mongoose.model('authSchema', authSchema)
