module.exports.query = (authorEmail, status) => `
xquery version "3.1";
    declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
    for $article in collection("/db/scientificArticles/articles/")/ns1:article
    where $article/ns1:info/ns1:status/text() = "${status.toString().replace(/"/g, '""')}" and  $article/ns1:info/ns1:authors/ns1:corresponding-author/ns1:email//text() = "${authorEmail.toString().replace(/"/g, '""')}"
        return $article
`