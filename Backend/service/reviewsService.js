var reviewsRepository = require('../repository/reviewsRepository');

module.exports.saveXML = async (dom) => {
    return reviewsRepository.saveXML(dom);
}

module.exports.readXML = async (reviewId) => {
    return reviewsRepository.readXML(reviewId);
}

