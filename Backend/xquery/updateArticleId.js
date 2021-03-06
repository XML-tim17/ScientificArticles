module.exports.query = (articleId, version) =>
    `
    xquery version "3.1";
    declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
    update replace doc("/db/scientificArticles/articles/article${articleId.toString().replace(/"/g, '""')}/v${version.toString().replace(/"/g, '""')}.xml")/ns1:article/ns1:id/text() with '${articleId.toString().replace(/"/g, '""')}'
    `
