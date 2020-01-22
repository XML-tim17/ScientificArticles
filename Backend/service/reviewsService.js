var reviewsRepository = require('../repository/reviewsRepository');

module.exports.postReview = async (review) => {
    // extract article
    // set article state to Reviewed if all reviews done
    this.saveXML(review);
}

module.exports.saveXML = async (xml) => {
    var dom = new DOMParser().parseFromString(xml, 'text/xml');
    return reviewsRepository.saveXML(xml);
}

module.exports.readXML = async (reviewId) => {
    return reviewsRepository.readXML(reviewId);
}

