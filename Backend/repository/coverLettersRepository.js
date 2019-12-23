var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
const exist = require('@existdb/node-exist');
const options = require('./config');
const coverLettersURI = '/db/scientificArticles/coverLetters';

module.exports.saveXML = async (dom) => {
    var XMLstring = new XMLSerializer().serializeToString(dom);
    const db = exist.connect(options);
    let coverLettersCount = (await db.queries.readAll(`xquery version "3.1"; xmldb:get-child-resources("${coverLettersURI}")`, {})).hits;
    db.documents.upload(Buffer.from(XMLstring))
        .then(fileHandle => db.documents.parseLocal(fileHandle, `${coverLettersURI}/coverLetter${coverLettersCount + 1}.xml`, {}))
        .catch(e => console.error('fail', e))
}

module.exports.readXML = async (coverLetterId) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${coverLettersURI}/${coverLetterId}.xml`, {})
        .catch(e => console.error('fail', e))
    return DOMParser.parseFromString(result.toString(), 'text/xml');
}
