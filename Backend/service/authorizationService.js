const jwt = require('jsonwebtoken');
const userService = require('./userService')
const jwtConfig = require('../authorization/authorizationConfig');

const roles = {
    guest: 'GUEST',
    author: 'AUTHOR',
    reviewer: 'REVIEWER',
    editor: 'EDITOR'
}

module.exports.checkAuthorization = (req, role) => {
    let userRole = req.user.role;
    switch(userRole) {
        case roles.editor:
            return true;
        case roles.reviewer:
            if (role !== roles.editor) return true;
            else return false;
        case roles.author:
            if (role !== roles.editor || role !== roles.reviewer) return true;
            else return false;
        case roles.guest:
            if (role === roles.guest) return true;
            else return false;
        default: 
            return false;
    }
}

module.exports.getUserFromTokenParam = async (req) => {
    const token = req.params.token;
    if (!token) {
        req.user = guestUser;
        return req;
    }

    const user = jwt.verify(token, jwtConfig.jwtSecret) 

    let userObject = await userService.getUserForAuthorizaiton(user);

    req.user = userObject;
    return req;
}

module.exports.roles = roles;