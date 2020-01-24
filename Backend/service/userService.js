
var userRepository = require('../repository/userRepository');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;

var xpath = require('xpath')

const jwt = require('jsonwebtoken')
const jwtConfig = require('../authorization/authorizationConfig')
const JWT_SECRET = jwtConfig.jwtSecret;


module.exports.getPaswordOf = async (email) => {
    return await userRepository.getPasswordOf(email);
}

module.exports.getUserByEmail = async (email) => {
    return await userRepository.getUserByEmail(email);
}

module.exports.register = async (userObject) => {
    // check if email exists
    let exists = await userRepository.existsByEmail(userObject.email);
    if (exists === 'true') {
        throw new Error(`User with email ${userObject.email} already exists.`)
    }
    userObject.toReview = [];
    // create xml from object
    let userXML
    try {
         userXML = userObjectToXml(userObject);
    } catch (e) {
        throw new Error(`Invalid user data: ${e.message}`);
    }
    
    // write to database
    let userId = await userRepository.incrementUserCount(1);
    await userRepository.addUser(userId, userXML);
}

userObjectToXml = (userObject) => {
    let userXML = `<user>
    <role>AUTHOR</role>
    <name>${userObject.name}</name>
    <institution>${userObject.institution}</institution>
    <phoneNumber>${userObject.phoneNumber}</phoneNumber>
    <email>${userObject.email}</email>
    <password>${userObject.password}</password>
    <address>
        <city>${userObject.address.city}</city>
        <country>${userObject.address.country}</country>
    </address>
    <toReview>${userObject.toReview.map(articleId => `\n\t\t<articleId>${articleId}</articleId>`)}
    </toReview>
</user>`

    return userXML;
}
    

userDomToObject = (userDOM) => {
    let name = xpath.select('//name', userDOM)[0].textContent;
    let institution = xpath.select('//institution', userDOM)[0].textContent;
    let phoneNumber = xpath.select('//phoneNumber', userDOM)[0].textContent;
    let email = xpath.select('//email', userDOM)[0].textContent;
    let city = xpath.select('//city', userDOM)[0].textContent;
    let country = xpath.select('//country', userDOM)[0].textContent;
    let role = xpath.select('//role', userDOM)[0].textContent;
    let toReview;
    try {
        toReview = xpath.select('//articleId')
            .map(node => node.textContent);
    } catch (e) {
        toReview = [];
    }
    return {
        name,
        institution,
        phoneNumber,
        email,
        address: {
            city,
            country
        },
        role,
        toReview
    }
    
}

module.exports.login = async (email, password) => {
    // check username and password
    let exists = await userRepository.existsByEmail(email);
    if (!exists) {
        throw new Error("Username or passwrod incorrect.")
    }
    let userXML = await userRepository.getUserByEmail(email);
    let userDOM = new DOMParser().parseFromString(userXML, 'text/xml');
    
    let userPassword = xpath.select('//password', userDOM)[0].textContent;
    if (userPassword !== password) {
        throw new Error("Username or password incorrect.");
    }

    const userObject = userDomToObject(userDOM);
    const token = jwt.sign(userObject, JWT_SECRET, { expiresIn: '1 week' })
    return { token };
    // return jwt
}

module.exports.getUserForAuthorizaiton = async (userAutorization) => {
    // check username and password
    let exists = await userRepository.existsByEmail(userAutorization.email);
    if (!exists) {
        throw new Error("Bad authorization")
    }
    let userXML = await userRepository.getUserByEmail(userAutorization.email);
    let userDOM = new DOMParser().parseFromString(userXML, 'text/xml');
    const userObject = userDomToObject(userDOM);
    return userObject;
}