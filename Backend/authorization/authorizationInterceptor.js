const userService = require('../service/userService')
const jwt = require('jsonwebtoken')
const jwtConfig = require('./authorizationConfig');

const guestUser = {
    role: 'GUEST',
    name: 'Guest User'
}

module.exports.autorize = async (req) => {
    const authorizationHeader = req.header('Authorization')
    if (!authorizationHeader) {
        req.user = guestUser;
        return req;
    }

    const token = req.header('Authorization').replace('Bearer ', '')
    const user = jwt.verify(token, jwtConfig.jwtSecret) 

    let userObject = await userService.getUserForAuthorizaiton(user);

    req.user = userObject;
    return req;
    
}