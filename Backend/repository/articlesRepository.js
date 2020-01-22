var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
const exist = require('@existdb/node-exist');
const options = require('./config');
const articlesURI = '/db/scientificArticles/articles';

module.exports.saveXML = async (XMLstring) => {
    const db = exist.connect(options);
    // let articlesCount = (await db.queries.readAll(`xquery version "3.1"; xmldb:get-child-resources("${articlesURI}")`, {})).hits;
    // read sequencer
    let articlesCountXml = await db.documents.read(`${articlesURI}/article-sequencer.xml`, {});
    let articleCountDom = (new DOMParser()).parseFromString(articlesCountXml.toString(), 'text/xml');
    let articlesCount = +articleCountDom.getElementsByTagName('count')[0].textContent;
    articleCountDom.getElementsByTagName('count')[0].textContent = articlesCount + 1;
    articlesCountXml = new XMLSerializer().serializeToString(articleCountDom);

    // update sequencer
    let fileHandle =  await db.documents.upload(Buffer.from(articlesCountXml));
     await db.documents.parseLocal(fileHandle, `${articlesURI}/article-sequencer.xml`, {});

    // create collection for article
    await db.collections.create(`${articlesURI}/article${articlesCount + 1}`);

    //create version sequencer
    fileHandle =  await db.documents.upload(Buffer.from("<count>1</count>"));
    await db.documents.parseLocal(fileHandle, `${articlesURI}/article${articlesCount + 1}/version-sequencer.xml`, {});

    // create new xml document
    fileHandle = await db.documents.upload(Buffer.from(XMLstring));
    await db.documents.parseLocal(fileHandle, `${articlesURI}/article${articlesCount + 1}/v1.xml`, {});
}

module.exports.getLastVersion = async (articleId) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${articlesURI}/${articleId}/version-sequencer.xml`, {})
        .catch(e => console.error('fail', e))
    return new DOMParser.parseFromString(result.toString(), 'text/xml');

}

module.exports.readXML = async (articleId, version) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${articlesURI}/${articleId}/v${version}.xml`, {})
        .catch(e => console.error('fail', e))
    return new DOMParser.parseFromString(result.toString(), 'text/xml');
}

