const User = require('../models/User');
const Role = require('../models/Role');
const helperService = require('../helpers')
const bcrypt = require('bcryptjs');

// postman://auth/callback?code=f07c4fb48d95dde6d92489f0825c95f1dc56e213202e838a8dde00cde58208e1

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body;

        const checkUserInfo = await User.findOne({ email });
        if (checkUserInfo === null) {

            const hashed = await helperService.encryptPassword(password);
            console.log("hashed", hashed)
            const user = await User.create({
                firstName, lastName, username, email,
                password: hashed,
                role
            });
            let data = user.toObject();
            let token = helperService.createToken({ id: user._id });
            data.token = token;
            res.json({ status: 200, message: "User created", data: data });
        } else {
            res.json({ status: 400, message: "Account already exits with email id.", data: {} });
        }
    } catch (err) {
        res.json({ status: 400, message: err.message, data: {} });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "Invalid user." });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Invalid password" });

        let token = helperService.createToken({ id: user._id });
        let data = user.toObject();
        data.token = token;
        res.json({status:200, message: "Login successful" , data : data });
    } catch (err) {
        res.json({staus : 400, message: err.message, data : {} });
    }
};