var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
const exist = require('@existdb/node-exist');
const options = require('./existConfig');
const reviewsURI = '/db/scientificArticles/reviews';
const addArticleToReviewer = require('../xquery/addArticleToReviewer');
const getReviewsByArticleURIXQ = require('../xquery/gerReviewsByArticleURI');
const getToReviewCountByArticleIdXQ = require('../xquery/getToReviewCountByArticleId');
const existsByEmailAndArticleIdXQ = require('../xquery/reviewExistsByReviewerEmailAndArticleId')
const getMergedReviews = require('../xquery/getReviewsForArticle')

module.exports.saveXML = async (dom) => {
    var XMLstring = new XMLSerializer().serializeToString(dom);
    const db = exist.connect(options);
    let reviewsCount = (await db.queries.readAll(`xquery version "3.1"; xmldb:get-child-resources("${reviewsURI}")`, {})).hits;
    db.documents.upload(Buffer.from(XMLstring))
        .then(fileHandle => db.documents.parseLocal(fileHandle, `${reviewsURI}/review${reviewsCount + 1}.xml`, {}))
        .catch(e => console.error('fail', e))
}

module.exports.readXML = async (reviewId) => {
    const db = exist.connect(options);
    let result = await db.documents.read(`${reviewsURI}/${reviewId}.xml`, {})
        .catch(e => console.error('fail', e))
    return new DOMParser().parseFromString(result.toString(), 'text/xml');
}

module.exports.addNewReview = async (reviewXML, reviewId) => {
    const db = exist.connect(options);
    fileHandle = await db.documents.upload(Buffer.from(reviewXML));
    await db.documents.parseLocal(fileHandle, `${reviewsURI}/review${reviewId}.xml`, {});
}

module.exports.incrementReviewCount = async (incrementBy) => {
    const db = exist.connect(options);
    let reviewCountXML;
    try {
        reviewCountXML = await db.documents.read(`${reviewsURI}/review-sequencer.xml`, {});
    } catch (e) {
        reviewCountXML = '<count>0</count>';
        let sequencerFileHandle = await db.documents.upload(Buffer.from(reviewCountXML));
        await db.documents.parseLocal(sequencerFileHandle, `${reviewsURI}/review-sequencer.xml`, {});
    }
    let reviewCountDOM = (new DOMParser()).parseFromString(reviewCountXML.toString(), 'text/xml');
    let reviewCount = +reviewCountDOM.getElementsByTagName('count')[0].textContent;
    reviewCountDOM.getElementsByTagName('count')[0].textContent = reviewCount + incrementBy;
    reviewCountXML = new XMLSerializer().serializeToString(reviewCountDOM);

    let fileHandle = await db.documents.upload(Buffer.from(reviewCountXML));
    await db.documents.parseLocal(fileHandle, `${reviewsURI}/review-sequencer.xml`, {});

    return reviewCount + incrementBy;
}

module.exports.addArticleToReviewer = async (email, articleURI) => {
    const db = exist.connect(options);
    await db.queries.execute(addArticleToReviewer.query(email, articleURI), {});
}

module.exports.getArticleReviewCount = async (articleURI) => {
    const db = exist.connect(options);

    let result = await db.queries.readAll(getReviewsByArticleURIXQ.query(articleURI), {});
    return Buffer.concat(result.pages).toString();

}

module.exports.getToReviewByArticleId = async (articleId) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getToReviewCountByArticleIdXQ.query(articleId), {});
    return Buffer.concat(result.pages).toString();
}

module.exports.existsByEmailAndArticleURI = async (email, articleURI) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(existsByEmailAndArticleIdXQ.query(articleURI, email), {});
    return Buffer.concat(result.pages).toString();
}

module.exports.getReviewsForArticle = async (articleId, version) => {
    const db = exist.connect(options);
    let result = await db.queries.readAll(getMergedReviews.query(articleId, version), {});
    return Buffer.concat(result.pages).toString();

}