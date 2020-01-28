
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

module.exports.getAll = async () => {
    let users = await userRepository.getAll();
    return users.map(user => userDomToObject(new DOMParser().parseFromString(user, 'text/xml')));
}

module.exports.register = async (userObject) => {
    // check if email exists
    let exists = await userRepository.existsByEmail(userObject.email);
    if (exists === 'true') {
        let error = new Error(`User with email ${userObject.email} already exists.`)
        error.status = 400;
        throw error;
    }
    userObject.toReview = [];
    // create xml from object
    let userXML
    try {
        userXML = userObjectToXml(userObject);
    } catch (e) {
        let error = new Error(`Invalid user data: ${e.message}`);
        error.status = 400;
        throw error;
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
    <keywords>${userObject.keywords.map(keyword => `\n\t\t<keyword>${keyword}</keyword>`)}
    </keywords>
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
    let keywords;
    try {
        toReview = xpath.select('//toReview/articleId', userDOM)
            .map(node => node.textContent);
        keywords = xpath.select('//keywords/keyword', userDOM)
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
        toReview,
        keywords
    }

}

module.exports.login = async (email, password) => {
    // check username and password
    let exists = await userRepository.existsByEmail(email);
    if (!exists) {
        let error = new Error("Username or passwrod incorrect.")
        error.status = 400;
        throw error;
    }
    let userXML = await userRepository.getUserByEmail(email);
    let userDOM = new DOMParser().parseFromString(userXML, 'text/xml');

    let userPassword = xpath.select('//password', userDOM)[0].textContent;
    if (userPassword !== password) {
        let error = new Error("Username or password incorrect.");
        error.status = 400;
        throw error;
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
        let error = new Error("Bad authorization");
        error.status = 400;
        throw error;
    }
    let userXML = await userRepository.getUserByEmail(userAutorization.email);
    let userDOM = new DOMParser().parseFromString(userXML, 'text/xml');
    const userObject = userDomToObject(userDOM);
    return userObject;
}