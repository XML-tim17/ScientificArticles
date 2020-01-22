
const axios = require('axios');

function decodeEntities(encodedString) {
    return encodedString.replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}

module.exports.transform = async (xmlString, xsltString) => {
    try {
        res = await axios.post('http://localhost:5000/xslt', {
            xmlString,
            xsltString
        })
        return decodeEntities(res);

    } catch (e) {
        console.log(e);
        throw new Error('xsl transformation error');
    }
}