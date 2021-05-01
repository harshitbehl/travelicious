var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
    var jwtToken = req.headers['x-access-token'];
    // console.log("jwtToken" + jwtToken)
    console.log(jwtToken)
    if (!jwtToken)
        return res
            .status(403)
            .send(
                {
                    auth: false,
                    message: 'No jwt token provided in header.'
                });

    jwt.verify(jwtToken, config.NOT_SECRET, function (err, decoded) {
        if (err)
            return res
                .status(500)
                .send(
                    {
                        auth: false,
                        message: 'Failed to authenticate jwt token.'
                    });

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;