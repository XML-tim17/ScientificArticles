var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
const exist = require('@existdb/node-exist');
const options = require('./existConfig');
const coverLettersURI = '/db/scientificArticles/coverLetters';

module.exports.saveXML = async (dom) => {
    var XMLstring = new XMLSerializer().serializeToString(dom);
    const db = exist.connect(options);
    let coverLettersCount = (await db.queries.readAll(`xquery version "3.1"; xmldb:get-child-resources("${coverLettersURI}")`, {})).hits;
    db.documents.upload(Buffer.from(XMLstring))
        .then(fileHandle => db.documents.parseLocal(fileHandle, `${coverLettersURI}/coverLetter${coverLettersCount + 1}.xml`, {}))
        .catch(e => console.error('fail', e))
}

module.exports.readXML = async (articleId, version) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${coverLettersURI}/coverLetter${articleId}/v${version}.xml`, {})
        .catch(e => console.error('fail', e))
    return new DOMParser().parseFromString(result.toString(), 'text/xml');
}
