var questionnaireRepository = require('../repository/questionnaireRepository');

module.exports.saveXML = async (dom) => {
    return questionnaireRepository.saveXML(dom);
}

module.exports.readXML = async (questionnaireId) => {
    return questionnaireRepository.readXML(questionnaireId);
}

