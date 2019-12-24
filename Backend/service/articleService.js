const fs = require('fs');
const axios = require('axios');
var articlesRepository = require('../repository/articlesRepository');
const grddlPath = "./xsl/grddl.xsl";

const test = require('./test');
function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}

module.exports.saveXML = async (xml) => {
    console.log('udjoh');

    res = await axios.post('http://localhost:5000/xslt', {
        xmlString: test.test.xml,
        xsltString: test.test.xsl
    })
    console.log("##################################################################################")
    console.log(res.data);
    console.log("##################################################################################")
    return decodeEntities(res.data);
    //return articlesRepository.saveXML(xml);
}

module.exports.readXML = async (articleId) => {
    return articlesRepository.readXML(articleId);
}

