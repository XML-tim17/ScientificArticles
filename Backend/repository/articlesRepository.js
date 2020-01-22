var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
const exist = require('@existdb/node-exist');
const options = require('./config');
const articlesURI = '/db/scientificArticles/articles';


const getAllArticles = require('../xquery/getAllArticles');

module.exports.addNewArticle = async (xmlString, articleId, version) => {
    const db = exist.connect(options);
    fileHandle = await db.documents.upload(Buffer.from(xmlString));
    await db.documents.parseLocal(fileHandle, `${articlesURI}/article${articleId}/v${version}.xml`, {});
}

module.exports.getArticleCount = async () => {
    const db = exist.connect(options);
    let articlesCountXml = await db.documents.read(`${articlesURI}/article-sequencer.xml`, {});
    let articleCountDom = (new DOMParser()).parseFromString(articlesCountXml.toString(), 'text/xml');
    let articlesCount = +articleCountDom.getElementsByTagName('count')[0].textContent;

    return articlesCount;
}

module.exports.incrementArticleCount = async (incrementBy) => {
    const db = exist.connect(options);
    let articlesCountXml = await db.documents.read(`${articlesURI}/article-sequencer.xml`, {});
    let articleCountDom = (new DOMParser()).parseFromString(articlesCountXml.toString(), 'text/xml');
    let articlesCount = +articleCountDom.getElementsByTagName('count')[0].textContent;
    articleCountDom.getElementsByTagName('count')[0].textContent = articlesCount + incrementBy;
    articlesCountXml = new XMLSerializer().serializeToString(articleCountDom);

    let fileHandle =  await db.documents.upload(Buffer.from(articlesCountXml));
    await db.documents.parseLocal(fileHandle, `${articlesURI}/article-sequencer.xml`, {});

    return articlesCount + incrementBy;
}

module.exports.addNewArticleCollection = async (articleId) => {
    const db = exist.connect(options);
    await db.collections.create(`${articlesURI}/article${articleId}`);
}

module.exports.getLastVersion = async (articleId) => {
    const db = exist.connect(options);
    let versionCountXml = await db.documents.read(`${articlesURI}/article${articleId}/version-sequencer.xml`, {});
    let versionCountDom = (new DOMParser()).parseFromString(versionCountXml.toString(), 'text/xml');
    let articlesCount = +versionCountDom.getElementsByTagName('count')[0].textContent;
    
    return articlesCount
}

module.exports.createVersionSequencer = async (articleId) => {
    const db = exist.connect(options);
    fileHandle =  await db.documents.upload(Buffer.from("<count>1</count>"));
    await db.documents.parseLocal(fileHandle, `${articlesURI}/article${articleId}/version-sequencer.xml`, {});

    return 1;
}

module.exports.readXML = async (articleId, version) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${articlesURI}/article${articleId}/v${version}.xml`, {})
    return new DOMParser().parseFromString(result.toString(), 'text/xml');
}

module.exports.getAll = async () => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getAllArticles.query, {});
    return Buffer.concat(result.pages).toString();
}

