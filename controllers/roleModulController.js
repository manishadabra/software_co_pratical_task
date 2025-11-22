const User = require('../models/User');
const Role = require('../models/Role');
const helperService = require('../helpers');

exports.updateListAccessModule = async (req, res) => {
    try {
        const { moduleName } = req.body;

        // ▪ Insert only unique value
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { accessModules: moduleName } }, // ensures UNIQUE
            { new: true }
        );

        let data = role.toObject();
        res.json({status : 200, message : "success", data : data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.removeAccessModule = async (req, res) => {
    try {
        const { moduleName } = req.body;

        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { $pull: { accessModules: moduleName } },
            { new: true }
        );

        res.json(role);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.addRole = async (req, res) => {
    try {
        const { roleName, accessModules } = req.body;
        console.log("accessModules", accessModules)
        let roleInfo = await Role.findOne({ roleName: roleName })
        console.log("roleInfo>>", roleInfo)
        if (roleInfo !== null) {
            res.json({ message: "Role already exists", data : {} });
        } else {
            const user = await Role.create({
                roleName,
                accessModules
            });
            res.json({ message: "User created", user });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getRole = async (req, res) => {
    try {
        let roleInfo = await Role.find({ active: true }, {_id : 1, roleName : 1, accessModules : 1, active : 1, createdAt : 1})
        console.log("roleInfo>>", roleInfo)
        if (roleInfo.length>0) {
            res.json({status : 200,  message: "Success", data : roleInfo});
        } else {
            res.json({status : 200, message: "No data found", data : []});
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}