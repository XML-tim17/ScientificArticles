const fs = require('fs');
const axios = require('axios');
var articlesRepository = require('../repository/articlesRepository');
const grddlPath = "./xsl/grddl.xsl";
const xsltService = require('./xsltService')

const test = require('./test');

module.exports.addNewArticle = async (xml) => {
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