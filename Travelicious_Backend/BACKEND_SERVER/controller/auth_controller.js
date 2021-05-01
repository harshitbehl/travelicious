const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const config = require('../config');
const request = require('request');



require("../model/auth_model")
const authSchema = mongoose.model("authSchema");;

var sendJSONresponse = function (res, status, content) {
    console.log("sendJSONresponse");
    
    res.status(status).json(content);
}


const createNewUser = async (req, res) => {
    const salt = await bcrypt.genSalt()
    const hashedpassword = await bcrypt.hash(req.body.password, salt)
    const newSignup = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        username: req.body.username,
        password: hashedpassword
    }

    authSchema.create(newSignup, (err, credential) => {
        if (err)
            sendJSONresponse(res, 500, err);

        const token = jwt.sign({ id: credential._id }, config.NOT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.cookie('auth-token', token, [options]);
        console.log(auth-token);
        sendJSONresponse(res, 200,
            {
                auth: true,
                token: token,
                "Message": "Signup succeessful for " + credential.username
            })
    })
}

/**
 *  [GET] : '/auth/login'
 *  @param username
 *  @param password
 *  @returns object with jwt
*/


module.exports.login = async function (req, res) {

    console.log("Inside login method")

    //console.log("Username: "+req.query.username)
    
    authSchema.findOne({ username: req.query.username }, function (err, docs) {

        if (err)
            sendJSONresponse(res, 500, "Internal Server Error");           
        if (docs && bcrypt.compareSync(req.query.password, docs.password)) {

            const token = jwt.sign({ id: docs._id }, config.NOT_SECRET, {
                expiresIn: 86400 // expires in 24 hours 
            });
            
            res.cookie('atoken', token, {maxage :86400});
            res.send(req.cookie);
            req.cookies['atoken'];
           //  console.log(token);
             //console.log(req.cookies);

         /*   sendJSONresponse(res, 200,
                {
                    auth: true,
                    token: token,
                    Message: "Login succeessful for " + docs.username
                }
            )*/
            
        }
        else
            sendJSONresponse(res, 403, { "Message": "Username/password incorrect." });

        console.log("END login method")
    });
};

/**
 * [POST] : '/auth/signup'
 *  @param firstname
 *  @param lastname
 *  @param phonenumber
 *  @param email
 *  @param username
 *  @param password
 *  @returns object with jwt
 */
module.exports.signup = async function (req, res) {

    console.log("Inside Signup method")
    authSchema.findOne({
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ]
    }, function (err, docs) {
        if (err) {
            sendJSONresponse(res, 500, "Internal Server Error");
        }
        if (docs == null)
            //if a user does not exist with the same userename then create a new one
            createNewUser(req, res);
        else
            sendJSONresponse(res, 403, { "Message": "A user already exists with the same username or email" });
    });

}