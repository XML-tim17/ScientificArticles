var coverLetterRepository = require('../repository/coverLettersRepository');

module.exports.saveXML = async (xml) => {
    var dom = new DOMParser().parseFromString(xml, 'text/xml');
    return coverLetterRepository.saveXML(xml);
}

module.exports.readXML = async (articleId, version) => {
    return coverLetterRepository.readXML(articleId, version);
}

