const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports.validateToken = function(req, res, next){
    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({auth: false, message: 'No token provided'});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, function(error, decoded){
        if(error){
            return res.status(500).send({auth: false, message:"Authorization Failed"});
        }
        next();
    });
}

module.exports.generateToken = function(uniqueID){
    return jwt.sign({id: uniqueID}, process.env.TOKEN_SECRET, {expiresIn: 300});
}