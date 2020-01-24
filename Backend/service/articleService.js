const fs = require('fs');
const axios = require('axios');
var articlesRepository = require('../repository/articlesRepository');
const grddlPath = "./xsl/grddl.xsl";
const xsltService = require('./xsltService')
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var xpath = require('xpath')
var _ = require('lodash')

const test = require('./test');

var ns1 = "https://github.com/XML-tim17/ScientificArticles";

module.exports.addNewArticle = async (xml) => {

    let articleDOM = (new DOMParser).parseFromString(xml, 'text/xml');

    articleDOM = checkAndGenerateIds(articleDOM);

    let articleXML = new XMLSerializer().serializeToString(articleDOM);

    articleRDFa = await xsltService.transform(articleXML, fs.readFileSync('./xsl/article-to-rdfa.xsl', 'utf8'));
    let articleRDFxml = await xsltService.transform(articleRDFa, fs.readFileSync('./xsl/grddl.xsl', 'utf8'));
    // save to rdf

    //update articleSequencer
    let articleId = await articlesRepository.incrementArticleCount(1);

    // create collection for article
    await articlesRepository.addNewArticleCollection(articleId);

    //create version sequencer
    let version = await articlesRepository.createVersionSequencer(articleId);

    // create new xml document
    await articlesRepository.addNewArticle(xml, articleId, version);

    await articlesRepository.updateArticleId(articleId, version);
}

checkAndGenerateIds = (articleDOM) => {
    // validate ids
    let select = xpath.useNamespaces({ "ns1": ns1 });
    let nodes = select('//@ns1:id', articleDOM)
    let ids = nodes.map(node => node.value)

    if (_.uniq(ids).length !== ids.length) throw new Error('Invalid article, duplicate ids found.')

    //generate ids
    let prefix = '';
    let nsMap = select('/*', articleDOM)[0]._nsMap
    for (let key in nsMap) {
        if (nsMap[key] === ns1) {
            prefix = key + ':'
        }
    }

    let abstract = select('//ns1:abstract', articleDOM)
    let figures = select('//ns1:figure', articleDOM)
    let tables = select('//ns1:table', articleDOM)
    let sections = select('//ns1:section', articleDOM)
    let quotes = select('//ns1:quote', articleDOM)
    let allNodes = abstract.concat(figures).concat(tables).concat(sections).concat(quotes);

    let count = 1;
    for (let node of allNodes) {
        while (ids.includes(count.toString())) {
            count += 1;
        }
        if (!node.getAttributeNS(ns1, 'id')) {
            node.setAttributeNS(ns1, prefix + 'id', count);
            count += 1;
        }
    }

    return articleDOM;
}


module.exports.getLastVersion = async (articleId) => {
    let version = articlesRepository.getLastVersion(articleId);
    return version;
}

module.exports.readXML = async (articleId, version) => {
    return articlesRepository.readXML(articleId, version);
}

module.exports.getAll = async () => {
    let documents = await articlesRepository.getAll();
    // get simple data of all published articles
    return documents;

}

module.exports.getReviews = async (articleId) => {
    reviews = [];
    // get all reviews for given articleId
    // xslt transform into one document
    // xslt to html/pdf
    mergedReview = {}
    return mergedReview;
}

module.exports.toBeReviewed = async () => {
    let documents = await articlesRepository.toBeReviewed();
    // get simple data of all published articles
    return documents;
}

module.exports.postRevision = async (articleId, article) => {

    let version = await articlesRepository.getLastVersion(articleId);

    await articlesRepository.addNewArticle(article, articleId, version + 1);

    articlesRepository.incrementVersionCount(articleId, 1);
}

module.exports.basicSearch = async (queryString) => {
    let documents = await articlesRepository.getAllByTitle(queryString);
    // get simple data of all published articles
    return documents;
}

module.exports.advancedSearch = async (searchData) => {
    result = [];
    // do advanced search on rdf database
    // extract simple data from articles
    return result;
}


module.exports.getArticlesToReview = async (reviewerId) => {
    result = [];
    // get articles that reviewer should review
    // extract simple data
    return result;
}

module.exports.setStatus = async (articleId, status) => {
    // check if status is valid according to state diagram

    let version = await articlesRepository.getLastVersion(articleId);
    let currentStatus = await articlesRepository.getStatusOf(articleId, version);
    if (isNextStateValid(currentStatus, status)) {
        articlesRepository.setStatus(articleId, version, status);
        return true;
    }

    return false;

}

isNextStateValid = (currentState, nextState) => {
    const stateMachine = {
        'toBeReviewed': ['inReviewProgress'],
        'inReviewProcess': ['reviewed'],
        'reviewed': ['rejected', 'accepted', 'revisionRequired'],
        'rejected': [],
        'accepted': [],
        'revisionRequired': ['revisionRecieved'],
        'revisionRecieved': ['inReviewProcess', 'rejected', 'accepted']
    }

    return stateMachine[currentState].indexOf(nextState) !== -1;
}