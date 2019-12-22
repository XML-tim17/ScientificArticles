const exist = require('@existdb/node-exist');
const options = require('./config');
const questionnairesURI = '/db/scientificArticles/questionnaires';

module.exports.saveXML = async (XMLstring) => {
    const db = exist.connect(options);
    let questionnairesCount = (await db.queries.readAll(`xquery version "3.1"; xmldb:get-child-resources("${questionnairesURI}")`, {})).hits;
    db.documents.upload(Buffer.from(XMLstring))
        .then(fileHandle => db.documents.parseLocal(fileHandle, `${questionnairesURI}/questionnaire${questionnairesCount + 1}.xml`, {}))
        .catch(e => console.error('fail', e))
}

module.exports.readXML = async (questionnaireId) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${questionnairesURI}/${questionnaireId}.xml`, {})
        .catch(e => console.error('fail', e))
    return result.toString();
}

