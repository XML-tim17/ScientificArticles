var questionnaireRepository = require('../repository/questionnaireRepository');

module.exports.saveXML = async (xml) => {
    var dom = new DOMParser().parseFromString(xml, 'text/xml');
    return questionnaireRepository.saveXML(xml);
}

module.exports.readXML = async (questionnaireId) => {
    return questionnaireRepository.readXML(questionnaireId);
}

