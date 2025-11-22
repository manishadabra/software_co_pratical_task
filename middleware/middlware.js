const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const noNeedToTokenApi = [
    '/api/auth/signup',
    '/api/auth/login',
    '/api/auth/get-roles'
]

let middlewar = {
    verifyUser: async function (req, res, next) {
        if (noNeedToTokenApi.includes(req.path)) {
            return next();
        }

        if (!req.headers.authorization) {
            res.json({ status: 400, message: "unauthorized user", data: {} })
        } else {
            //dedecode token
            let token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findOne({ _id :  decoded.id});
            console.log("erewrwer", user)
            if (!user) {
                return res.status(404).json({ error: "Unauthorized user." });
            } else {
                req.decoded = decoded;
                console.log("request", req.url, decoded)
                next();
            }
        }
    }
}

module.exports = middlewar