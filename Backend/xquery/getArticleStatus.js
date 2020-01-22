

module.exports.query = (articleId, version) => 
    `
    xquery version "3.1";
    declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
    doc("/db/scientificArticles/articles/article${articleId}/v${version}.xml")/ns1:article/ns1:info/ns1:status/text()
    `