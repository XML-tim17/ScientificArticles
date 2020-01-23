const getPasswordByEmail = require('../xquery/getPasswordByEmail');
const getUserByEmail = require('../xquery/getUserByEmail');

const exist = require('@existdb/node-exist');
const options = require('./config');

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