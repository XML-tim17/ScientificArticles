const exist = require('@existdb/node-exist');
const options = require('./config');
const revieswsURI = '/db/scientificArticles/reviews';

module.exports.saveXML = async (XMLstring) => {
    const db = exist.connect(options);
    let reviewsCount = (await db.queries.readAll(`xquery version "3.1"; xmldb:get-child-resources("${reviewsURI}")`, {})).hits;
    db.documents.upload(Buffer.from(XMLstring))
        .then(fileHandle => db.documents.parseLocal(fileHandle, `${revieswsURI}/review${reviewsCount + 1}.xml`, {}))
        .catch(e => console.error('fail', e))
}

module.exports.readXML = async (reviewId) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${revieswsURI}/${reviewId}.xml`, {})
        .catch(e => console.error('fail', e))
    return result.toString();
}

