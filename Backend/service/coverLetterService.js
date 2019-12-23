var coverLetterRepository = require('../repository/coverLettersRepository');

module.exports.saveXML = async (dom) => {
    return coverLetterRepository.saveXML(dom);
}

module.exports.readXML = async (coverLetterId) => {
    return coverLetterRepository.readXML(coverLetterId);
}

