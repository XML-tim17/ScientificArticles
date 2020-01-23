var reviewsRepository = require('../repository/reviewsRepository');
var articleRepository = require('../repository/articlesRepository')
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var xpath = require('xpath');


var ns = "https://github.com/XML-tim17/ScientificArticles";

module.exports.postReview = async (reviewXML) => {
    // get article id
    let reviewDOM = new DOMParser().parseFromString(reviewXML, 'text/xml');
    let select = xpath.useNamespaces({'ns': ns})
    let articleNode = select('//ns:article-id', reviewDOM)[0]
    let articleId = articleNode.firstChild.data;

    // check article state
    let status = await articleRepository.getStatusOfByURI(articleId);
    console.log('status', status);
    if (status !== 'inReviewProcess') {
        throw new Error('Invalid review, target article is not in review process.');
    }
    

    // TODO check  if user can review this article

    // TODO validate review xml by schema


    // get aricle by id
    let articleDOM = await articleRepository.getById(articleId);

    // check references
    let ref_ids = select('//@reference-id', reviewDOM).map(node => node.value);
    let ids = select('//@ns:id', articleDOM).map(node => node.value);

    for (let ref_id of ref_ids) {
        if(!ids.includes(ref_id)) {
            throw new Error('Invalid review, comment references non existing id');
        }
    }

    // TODO set article state to Reviewed if all reviews done

    // save review in exist
    let reviewCount = await reviewsRepository.incrementReviewCount(1);
    reviewsRepository.addNewReview(reviewXML, reviewCount);
}

module.exports.saveXML = async (xml) => {
    var dom = new DOMParser().parseFromString(xml, 'text/xml');
    return reviewsRepository.saveXML(xml);
}

module.exports.readXML = async (reviewId) => {
    return reviewsRepository.readXML(reviewId);
}

