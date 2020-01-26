const getArticlesInStatusByCorrespondingAuthorEmail = require('../xquery/getArticlesInStatusByCorrespondingAuthorEmail');

const exist = require('@existdb/node-exist');
const options = require('./existConfig');


module.exports.getUsersArticlesInStatus = async (authorEmail, status) => {
    const db = exist.connect(options);

    let result = await db.queries.readAll(getArticlesInStatusByCorrespondingAuthorEmail.query(authorEmail, status), {});
    return Buffer.concat(result.pages).toString();
}