const fs = require('fs');
const axios = require('axios');
var articlesRepository = require('../repository/articlesRepository');
const grddlPath = "./xsl/grddl.xsl";
const xsltService = require('./xsltService')

const test = require('./test');

module.exports.saveXML = async (xml) => {
    // transformed = await xsltService.transform(test.test.xml, test.test.xsl);
    //save to rdf

    // update articleSequencer
    let articleId = await articlesRepository.incrementArticleCount(1);

    // create collection for article
    await articlesRepository.addNewArticleCollection(articleId);

    //create version sequencer
    let version = await articlesRepository.createVersionSequencer(articleId);

    // create new xml document
    await articlesRepository.addNewArticle(xml, articleId, version);
}

module.exports.getLastVersion = async (articleId) => {
    let version = articlesRepository.getLastVersion(articleId);
    return version;
}

module.exports.readXML = async (articleId, version) => {
    return articlesRepository.readXML(articleId, version);
}

module.exports.getAll = async () => {
    documents = [];
    let debugx = await articlesRepository.getAll();
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
    articles = [];
    // get all articles in toBeReviewed state
    // extract simple data to show on frontend
    return articles;
}

module.exports.postRevision = async (articleId, article) => {
    // save article as new version of article with id articleId
}

module.exports.basicSearch = async (queryString) => {
    result = [];
    // do basic search on eXist database
    // extract simple data from articles
    return result;
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
    // change status
}