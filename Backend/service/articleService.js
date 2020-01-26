const fs = require('fs');
const axios = require('axios');
var articlesRepository = require('../repository/articlesRepository');
const reviewsRepository = require('../repository/reviewsRepository');
const rdfRepository = require('../repository/rdfRepository');
const grddlPath = "./xsl/grddl.xsl";
var pdfService = require('../service/pdfService');
const xsltService = require('./xsltService');
const authorizationService = require('./authorizationService');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var xpath = require('xpath')
var _ = require('lodash')

const test = require('./test');

var ns1 = "https://github.com/XML-tim17/ScientificArticles";

module.exports.addNewArticle = async (xml, author) => {

    let articleDOM = (new DOMParser).parseFromString(xml, 'text/xml');

    // check corresponding author === author
    const authorValid = checkCorrespondingAuthor(articleDOM, author.email);
    if (!authorValid) {
        let error = new Error('Article must be submitted by its corresponding author');
        error.status = 400;
        throw error;
    }

    articleDOM = checkAndGenerateIds(articleDOM);

    let articleXML = new XMLSerializer().serializeToString(articleDOM);

    articleRDFa = await xsltService.transform(articleXML, fs.readFileSync('./xsl/article-to-rdfa.xsl', 'utf8'));
    let articleRDFxml = await xsltService.transform(articleRDFa, fs.readFileSync(grddlPath, 'utf8'));

    // save to rdf
    await rdfRepository.saveRDFxml(articleRDFxml);

    //update articleSequencer
    let articleId = await articlesRepository.incrementArticleCount(1);

    // create collection for article
    await articlesRepository.addNewArticleCollection(articleId);

    //create version sequencer
    let version = await articlesRepository.createVersionSequencer(articleId);

    // create new xml document
    await articlesRepository.addNewArticle(xml, articleId, version);

    await articlesRepository.updateArticleId(articleId, version);
    await rdfRepository.updateArticleId(articleId, version);

    await articlesRepository.setStatus(articleId, version, 'toBeReviewed');
    await rdfRepository.setStatus(articleId, version, 'toBeReviewed');

}

checkCorrespondingAuthor = (articleDOM, email) => {
    let select = xpath.useNamespaces({ "ns1": ns1 });
    let corrAuthorEmail = select('//ns1:info/ns1:authors/ns1:corresponding-author/ns1:email', articleDOM)[0].textContent;
    return corrAuthorEmail === email;
}

checkAndGenerateIds = (articleDOM) => {
    // validate ids
    let select = xpath.useNamespaces({ "ns1": ns1 });
    let nodes = select('//@ns1:id', articleDOM)
    let ids = nodes.map(node => node.value)

    if (_.uniq(ids).length !== ids.length) {
        const error = new Error('Invalid article, duplicate ids found.')
        error.status = 400;
        throw error;
    }

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
    let articleListXml = await articlesRepository.getAll();
    let xsltString = fs.readFileSync('./xsl/article-list-item.xsl', 'utf8');
    let select = xpath.useNamespaces({ "ns1": ns1 });


    articleListHtml = await Promise.all(articleListXml.map(async (articleXML) => {
        let articleDOM = new DOMParser().parseFromString(articleXML);
        let id = `article${select('//ns1:id//text()', articleDOM)[0].textContent}`
        let html = await xsltService.transform(articleXML, xsltString)

        return {
            id,
            html
        }
    }))


    return articleListHtml;
    // get simple data of all published articles
    return documents;

}

module.exports.getArticleHTML = async (articleId, user) => {
    var lastVersion =   await this.getLastVersion(+articleId);
    // check users level of access to this documnet
    let articleStatus = await articlesRepository.getStatusOf(articleId, lastVersion);
    
    const correspondingAuthorEmail = await articlesRepository.getCorrespondingAuthor(articleId, lastVersion);
    let xsltString;
    
    let access = checkArticleAccess(articleId, user, articleStatus, correspondingAuthorEmail);
    if (access === 'full') xsltString = fs.readFileSync('./xsl/article-detail-html.xsl', 'utf8');
    else if (access === 'no-authors') xsltString = fs.readFileSync('./xsl/article-detail-html-no-authors.xsl', 'utf8');
    else {
        let error = new Error("User does not have access to this article.");
        error.status = 403;
        throw error;
    }
    
    var dom = await this.readXML(+articleId, lastVersion);
    var document = new XMLSerializer().serializeToString(dom)

    
    let articleHTML = await xsltService.transform(document, xsltString);
    return articleHTML;
}

module.exports.getArticlePDF = async (articleId, user) => {
    var lastVersion =   await this.getLastVersion(+articleId);
    // check users level of access to this documnet
    let articleStatus = await articlesRepository.getStatusOf(articleId, lastVersion);
    
    const correspondingAuthorEmail = await articlesRepository.getCorrespondingAuthor(articleId, lastVersion);
    let xslfoString;
    
    let access = checkArticleAccess(articleId, user, articleStatus, correspondingAuthorEmail);
    if (access === 'full') xslfoString = fs.readFileSync('./xsl-fo/article-detail-xslfo.xsl', 'utf8');
    else if (access === 'no-authors') xslfoString = fs.readFileSync('./xsl-fo/article-detail-xslfo-no-authors.xsl', 'utf8');
    else {
        let error = new Error("User does not have access to this article.");
        error.status = 403;
        throw error;
    }
    
    var dom = await this.readXML(+articleId, lastVersion);
    var document = new XMLSerializer().serializeToString(dom)

    
    let bindata = await pdfService.transform(document, xslfoString)
    return bindata;
}

checkArticleAccess = (articleId, user, status, correspondingAuthorEmail) => {
    if (status === "accepted") {
        return 'full';
    } else {
        if (user.role === authorizationService.roles.editor) {
            return 'full';
        }
        if (correspondingAuthorEmail === user.email) {
            return 'full';
        } 
        if (user.role === authorizationService.roles.reviewer) {
            if (user.toReview.includes(`article${articleId}`)) {
                return 'no-authors';
            }
        }
        return 'denied';
    }
}

module.exports.getReviews = async (articleId) => {
    reviews = [];
    // get all reviews for given articleId
    // xslt transform into one document
    // xslt to html/pdf
    mergedReview = {}
    return mergedReview;
}

// module.exports.toBeReviewed = async () => {
//     let articleListXml = await articlesRepository.toBeReviewed();
//     let xsltString = fs.readFileSync('./xsl/article-list-item.xsl', 'utf8');
//     let select = xpath.useNamespaces({ "ns1": ns1 });
//     // get simple data of all published articles

//     articleListHtml = articleListXml.map(async (articleXML) => {
//         let articleDOM = new DOMParser().parseFromString(articleXML);
//         let id = `article${select(select('./ns1:id//text()', articleDOM)[0].textContent)}`
//         let html = await xsltService.transform(articleXML, xsltString)

//         return {
//             id,
//             html
//         }
//     })


//     return articleListHtml;
// }

module.exports.getAllByStatus = async (status) => {
    let articleListXml = await articlesRepository.getAllByStatus(status);
    let xsltString = fs.readFileSync('./xsl/article-list-item.xsl', 'utf8');
    let select = xpath.useNamespaces({ "ns1": ns1 });
    // get simple data of all published articles

    articleListHtml = await Promise.all(articleListXml.map(async (articleXML) => {
        let articleDOM = new DOMParser().parseFromString(articleXML);
        let id = `article${select('//ns1:id//text()', articleDOM)[0].textContent}`
        let html = await xsltService.transform(articleXML, xsltString)

        return {
            id,
            html
        }
    }))


    return articleListHtml;
}

module.exports.postRevision = async (articleId, article, author) => {

    let version = await articlesRepository.getLastVersion(articleId);

    const status = await articlesRepository.getStatusOf(articleId, version);
    if (status !== 'revisionRequired') {
        let error = new Error('Article does not require revision');
        error.status = 400;
        throw error;
    }

    let articleDOM = new DOMParser().parseFromString(article, 'text/xml');

    // validate corresponding author
    const authorValid = checkCorrespondingAuthor(articleDOM, author.email);
    if (!authorValid) {
        let error = new Error('Article revision must be submitted by its corresponding author');
        error.status = 400;
        throw error;
    }

    const oldArticleDOM = await articlesRepository.readXML(articleId, version);

    const previousAuthorValid = checkCorrespondingAuthor(oldArticleDOM, author.email);
    if (!previousAuthorValid) {
        let error = new Error('Article revision must have the same corresponding author as original article');
        error.status = 400;
        throw error;
    }

    articleDOM = checkAndGenerateIds(articleDOM);

    let articleXML = new XMLSerializer().serializeToString(articleDOM);

    const articleRDFa = await xsltService.transform(articleXML, fs.readFileSync('./xsl/article-to-rdfa.xsl', 'utf8'));
    let articleRDFxml = await xsltService.transform(articleRDFa, fs.readFileSync(grddlPath, 'utf8'));

    // save to rdf
    await rdfRepository.saveRDFxml(articleRDFxml);

    await articlesRepository.addNewArticle(articleXML, articleId, version + 1);

    await articlesRepository.updateArticleId(articleId, version + 1);
    await rdfRepository.updateArticleId(articleId, version + 1);

    await this.setStatus(articleId, 'revisionRecieved');

    await articlesRepository.incrementVersionCount(articleId, 1);

    await articlesRepository.setStatus(articleId, version, 'outdated');
    await rdfRepository.setStatus(articleId, version, 'outdated');

    return "success";
}

module.exports.basicSearch = async (queryString) => {
    let articleListXml = await articlesRepository.getAllByText(queryString);
    let xsltString = fs.readFileSync('./xsl/article-list-item.xsl', 'utf8');
    let select = xpath.useNamespaces({ "ns1": ns1 });

    articleListHtml = await Promise.all(articleListXml.map(async (articleXML) => {
        let articleDOM = new DOMParser().parseFromString(articleXML);
        let id = `article${select('//ns1:id//text()', articleDOM)[0].textContent}`
        let html = await xsltService.transform(articleXML, xsltString)

        return {
            id,
            html
        }
    }))


    return articleListHtml;
    // get simple data of all published articles
}

module.exports.advancedSearch = async (searchData) => {
    result = [];
    // do advanced search on rdf database
    // extract simple data from articles
    return result;
}


module.exports.getArticlesToReview = async (reviewer) => {
    result = [];
    // get articles that reviewer should review
    let articleList = [];
    for (let articleId of reviewer.toReview) {
        articleId = +articleId.substring(7)
        const version = await articlesRepository.getLastVersion(articleId);
        const status = await articlesRepository.getStatusOf(articleId, version);

        const reviewed = await reviewsRepository.existsByEmailAndArticleURI(reviewer.email, `article${articleId}/v${version}`);
        if (reviewed === 'true') {
            continue;
        }
        if (status === "inReviewProcess") {
            let articleXML = await articlesRepository.readXML(articleId, version);
            articleList.push({
                id: `article${articleId}`,
                xmlString: new XMLSerializer().serializeToString(articleXML)
            });
        }
    }
    // extract simple data

    return articleList;
}

module.exports.setStatus = async (articleId, status) => {
    // check if status is valid according to state diagram

    let version = await articlesRepository.getLastVersion(articleId);
    let currentStatus = await articlesRepository.getStatusOf(articleId, version);
    if (isNextStateValid(currentStatus, status)) {
        await articlesRepository.setStatus(articleId, version, status);
        await rdfRepository.setStatus(articleId, version, status);
        return true;
    }

    return false;
}

module.exports.requestRevision = async (articleId) => {
    const version = await articlesRepository.getLastVersion(articleId);
    let status = await articlesRepository.getStatusOf(articleId, version);

    if (status !== 'reviewed') {
        let error = new Error('Article is not reviewed');
        error.status = 400;
        throw error;
    }
    await articlesRepository.setStatus(articleId, version, 'revisionRequired');
    await rdfRepository.setStatus(articleId, version, 'revisionRequired');
}

module.exports.giveUp = async (articleId, user) => {
    const version = await articlesRepository.getLastVersion(articleId);
    const correspondingAuthorEmail = await articlesRepository.getCorrespondingAuthor(articleId, version);
    const status = await articlesRepository.getStatusOf(articleId, version);
    if (status === 'accepted') {
        let error = new Error("Cannot withdraw accepted article.");
        error.status = 400;
        throw error;
    }
    // const select = xpath.useNamespaces({ "ns1": ns1 });
    // const correspondingAuthorEmail = select('//ns1:email', correspondingAuthorDOM)[0];
    if (correspondingAuthorEmail !== user.email) {
        let error = new Error("Only corresponding author can give up on article.");
        error.status = 403;
        throw error;
    }

    await articlesRepository.setStatus(articleId, version, 'outdated');
    return 'success';
}

isNextStateValid = (currentState, nextState) => {
    const stateMachine = {
        'toBeReviewed': ['inReviewProgress'],
        'inReviewProcess': ['reviewed'],
        'reviewed': ['rejected', 'accepted', 'revisionRequired'],
        'rejected': [],
        'accepted': [],
        'revisionRequired': ['revisionRecieved'],
        'revisionRecieved': ['inReviewProcess', 'rejected', 'accepted'],
        'outdated': []
    }

    return stateMachine[currentState].indexOf(nextState) !== -1;
}