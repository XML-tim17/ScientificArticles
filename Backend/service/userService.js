
var userRepository = require('../repository/userRepository');

module.exports.getPaswordOf = async (email) => {
    return await userRepository.getPasswordOf(email);
}

module.exports.getUserByEmail = async (email) => {
    return await userRepository.getUserByEmail(email);
}