var articlesRepository = require('../repository/articlesRepository');

module.exports.saveXML = async (dom) => {
    return articlesRepository.saveXML(dom);
}

module.exports.readXML = async (articleId) => {
    return articlesRepository.readXML(articleId);
}

