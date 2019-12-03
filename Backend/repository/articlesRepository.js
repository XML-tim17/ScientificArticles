const exist = require('@existdb/node-exist');
const options = require('./config');
const articlesURI = '/db/scientificArticles/articles';

module.exports.saveXML = async (XMLstring) => {
    const db = exist.connect(options);
    let articlesCount = (await db.queries.readAll(`xquery version "3.1"; xmldb:get-child-resources("${articlesURI}")`, {})).hits;
    db.documents.upload(Buffer.from(XMLstring))
        .then(fileHandle => db.documents.parseLocal(fileHandle, `${articlesURI}/article${articlesCount + 1}.xml`, {}))
        .catch(e => console.error('fail', e))
}

module.exports.readXML = async (documentId) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${articlesURI}/${documentId}.xml`, {})
        .catch(e => console.error('fail', e))
    return result.toString();
}

