const authorsRepository = require('../repository/authorsRepository');
const rdfRepository = require('../repository/rdfRepository');
const xsltService = require('./xsltService');
const userService = require('./userService');
const fs = require('fs');

var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var xpath = require('xpath');


var ns1 = "https://github.com/XML-tim17/ScientificArticles";

module.exports.getArticles = async (authorEmail, status) => {
    // get all articles with status for author
    // if status === '' return all
    // extract simple data
    let result = await authorsRepository.getUsersArticlesInStatus(authorEmail, status);
    if (!result) {
        return {
            status: status,
            htmls: []
        }
    }
    //dom od ovoga
    //listu pojedinacnih stvari
    let result_dom = new DOMParser().parseFromString(result, 'text/xml');
    let select = xpath.useNamespaces({ "ns1": ns1 });
    let articleDomList = select('/ns1:article', result_dom);

    let xsltString = fs.readFileSync('./xsl/article-list-item.xsl', 'utf8');
    //for
    return {
        status: status,
        htmls: await Promise.all(articleDomList.map(async (articleNode) => {
            let articleXmlString = new XMLSerializer().serializeToString(articleNode);
            let articleHtmlString = await xsltService.transform(articleXmlString, xsltString);
            return {
                html: articleHtmlString,
                id: `article${select('./ns1:id//text()', articleNode)[0].textContent}`
            };

        }))
    };
}

module.exports.getCorrespondingAuthors = async (articleId) => {
    // get all authors
    // rank them by correspondance

    let users = await userService.getAll();
    let rdfResult = await rdfRepository.getKeywordsFromArticle(articleId);
    if (!rdfResult.data)
        return users;
    let keywords = rdfResult.data.results.bindings.map(binding => binding.keyword.value);
    users.forEach(user => {
        user.correspondanceLevel = keywords.filter(keyword => user.keywords.includes(keyword)).length;
    });
    return users.sort((a, b) => b.correspondanceLevel - a.correspondanceLevel);
}