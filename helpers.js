const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let helperService = {
    createToken: function (payload) {
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        return token;
    },
    encryptPassword: async function (password) {
        const salt = await bcrypt.genSalt(10);   // salt rounds
        const hash = await bcrypt.hash(password, salt);
        console.log(hash , "hash")
        return hash; 
    }
}

module.exports = helperService