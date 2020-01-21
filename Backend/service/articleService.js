const fs = require('fs');
const axios = require('axios');
var articlesRepository = require('../repository/articlesRepository');
const grddlPath = "./xsl/grddl.xsl";
const xsltService = require('./xsltService')

const test = require('./test');

module.exports.saveXML = async (xml) => {
    console.log('udjoh');


    transformed = await xsltService.transform(test.test.xml, test.test.xsl);
    //save to rdf
    return articlesRepository.saveXML(xml);
}

module.exports.readXML = async (articleId) => {
    return articlesRepository.readXML(articleId);
}

