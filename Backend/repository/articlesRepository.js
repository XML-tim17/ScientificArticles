var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
const exist = require('@existdb/node-exist');
const options = require('./config');
const articlesURI = '/db/scientificArticles/articles';

const getAllAcceptedArticles = require('../xquery/getAllAcceptedArticles');
const getAllToBeReviewedArticles = require('../xquery/getAllToBeReviewedArticles');
const getAllByText = require('../xquery/getAllByText');
const getArticleStatus = require('../xquery/getArticleStatus');
const getArticleStatusByURI = require('../xquery/getArticleStatusByURI');

const updateArticleStatus = require('../xquery/updateArticleStatus');
const updateArticleId = require('../xquery/updateArticleId');

const setArticleStatusByURI = require('../xquery/setArticleStatusByURI');
const getArticlesByStatus = require('../xquery/getArticlesByStatus')

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

module.exports.incrementVersionCount = async (articleId, incrementBy) => {
    const db = exist.connect(options);
    let versionXml = await db.documents.read(`${articlesURI}/article${articleId}/version-sequencer.xml`, {});
    let versionDom = (new DOMParser()).parseFromString(versionXml.toString(), 'text/xml');
    let version = +versionDom.getElementsByTagName('count')[0].textContent;
    versionDom.getElementsByTagName('count')[0].textContent = version + incrementBy;
    versionXml = new XMLSerializer().serializeToString(versionDom);

    let fileHandle =  await db.documents.upload(Buffer.from(versionXml));
    await db.documents.parseLocal(fileHandle, `${articlesURI}/article${articleId}/version-sequencer.xml`, {});

    return version + incrementBy;
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

module.exports.getById = async (articleURI) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${articlesURI}/${articleURI}.xml`, {});
    return new DOMParser().parseFromString(result.toString(), 'text/xml');
}

module.exports.getAll = async () => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getAllAcceptedArticles.query, {});
    return result.pages.map(page => Buffer(page).toString());
}

module.exports.toBeReviewed = async () => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getAllToBeReviewedArticles.query, {});
    return result.pages.map(page => Buffer(page).toString());
}

module.exports.getAllByText = async (title) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getAllByText.query(title), {});
    return result.pages.map(page => Buffer(page).toString());
}

module.exports.getStatusOf = async (articleId, version) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getArticleStatus.query(articleId, version), {});
    return Buffer.concat(result.pages).toString();
}

module.exports.getStatusOfByURI = async (articleURI) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getArticleStatusByURI.query(articleURI), {});
    return Buffer.concat(result.pages).toString();
}

module.exports.setStatus = async (articleId, version, status) => {
    const db = exist.connect(options);
    await db.queries.execute(updateArticleStatus.query(articleId, version, status), {});
}

module.exports.setStatusByURI = async (articleURI, status) => {
    const db = exist.connect(options);
    await db.queries.execute(setArticleStatusByURI.query(articleURI, status), {});
}

module.exports.updateArticleId = async (articleId, version) => {
    const db = exist.connect(options);
    await db.queries.execute(updateArticleId.query(articleId, version), {});
}

module.exports.getAllByStatus = async (status) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getArticlesByStatus.query(status), {});
    return result.pages.map(page => Buffer(page).toString());

}