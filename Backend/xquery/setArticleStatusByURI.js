module.exports.query = (articleURI, status) => 
    `
    xquery version "3.1";
    declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
    update replace doc("/db/scientificArticles/articles/${articleURI}.xml")/ns1:article/ns1:info/ns1:status/text() with '${status}'
    `