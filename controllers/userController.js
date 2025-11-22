const User = require('../models/User');
const Role = require('../models/Role');
const helperService = require('../helpers');

exports.GetUserList = async (req, res) => {
    console.log("req.decoded", req.decoded)
    try {
        const search = req.query.search || "";
        console.log("search", search)
        let filter = {}
        if (search) {
            filter = {
                $or: [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                ]
            };
        }

        const users = await User.find(filter)
            .populate("role", "roleName accessModules");

        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updateDiffertBulkUser = async (req, res) => {
    try {
        let updates = req.body.updateUser;
        console.log("req.body.", updates)
        /*
          Example Body:
          [
            { id: "userId1", data: { firstName: "A" } },
            { id: "userId2", data: { email: "b@gmail.com" } }
          ]
        */

        const operations = updates.map(u => ({
            updateOne: {
                filter: { _id: u.id },
                update: u.data
            }
        }));

        const result = await User.bulkWrite(operations);
        if (result.matchedCount > 0) {
            res.json({status : 200 , message : "users info updated", data : {}})
        } else {
            res.json({status : 400 , message : "Failed", data :{}})
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updateSameBulkUser = async (req, res) => {
    try {
        const { lastName } = req.body;

        const result = await User.updateMany({}, { lastName });
        if (result.matchedCount > 0) {
            res.json({status : 200 , message : "users info updated", data : {}})
        } else {
            res.json({status : 400 , message : "Failed", data :{}})
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.checkUserAccess = async (req, res) => {
    try {
        const user = await User.findById(req.decoded.id).populate("role");

        if (!user) return res.status(404).json({ error: "User not found" });
        console.log(user)

        const hasAccess = user.role.accessModules.includes(req.body.moduleName);

        res.json({status : 200, message : "Success", data :  {hasAccess} });
    } catch (err) {
        res.json({status : 400, message: err.message , data : {}});
    }
}