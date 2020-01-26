const getPasswordByEmail = require('../xquery/getPasswordByEmail');
const getUserByEmail = require('../xquery/getUserByEmail');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
const setUserRoleXQ = require('../xquery/setUserRole');
const getUserRoleXQ = require('../xquery/getUserRole');
const getAllUsersXQ = require('../xquery/getAllUsers');

const exist = require('@existdb/node-exist');
const options = require('./existConfig');

const existsByEmailQuery = require('../xquery/existsByEmail');

const usersURI = '/db/scientificArticles/users'

module.exports.getPasswordOf = async (email) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getPasswordByEmail.query(email), {});
    return Buffer.concat(result.pages).toString();
}

module.exports.getUserByEmail = async (email) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getUserByEmail.query(email), {});
    return Buffer.concat(result.pages).toString();
}

module.exports.getAll = async () => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getAllUsersXQ.query(), {});
    return result.pages.map(page => Buffer(page).toString());
}

module.exports.existsByEmail = async (email) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(existsByEmailQuery.query(email), {});
    return Buffer.concat(result.pages).toString()
}

module.exports.addUser = async (userId, userXML) => {
    const db = exist.connect(options);
    let fileHandle = await db.documents.upload(Buffer.from(userXML));
    await db.documents.parseLocal(fileHandle, `${usersURI}/user${userId}.xml`, {});
}

module.exports.incrementUserCount = async (incrementBy) => {
    const db = exist.connect(options);
    let userCountXML;
    try {
        userCountXML = await db.documents.read(`${usersURI}/user-sequencer.xml`, {});
    } catch (e) {
        userCountXML = '<count>0</count>';
        let sequencerFileHandle = await db.documents.upload(Buffer.from(userCountXML));
        await db.documents.parseLocal(sequencerFileHandle, `${usersURI}/user-sequencer.xml`, {});
    }
    let userCountDOM = (new DOMParser()).parseFromString(userCountXML.toString(), 'text/xml');
    let userCount = +userCountDOM.getElementsByTagName('count')[0].textContent;
    userCountDOM.getElementsByTagName('count')[0].textContent = userCount + incrementBy;
    userCountXML = new XMLSerializer().serializeToString(userCountDOM);

    let fileHandle = await db.documents.upload(Buffer.from(userCountXML));
    await db.documents.parseLocal(fileHandle, `${usersURI}/user-sequencer.xml`, {});

    return userCount + incrementBy;
}

module.exports.setUserRole = async (email, role) => {
    const db = exist.connect(options);
    await db.queries.execute(setUserRoleXQ.query(email, role), {});
}

module.exports.getUserRole = async (email) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getUserRoleXQ.query(email), {});
    return Buffer.concat(result.pages).toString();
}