module.exports.query = `
    xquery version "3.1";
    declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
    for $article in collection("/db/scientificArticles/articles/")/ns1:article
    where $article/ns1:info/ns1:status/text() = "toBeReviewed"
        return <ns1:article>
                    {$article/ns1:title}
                    {$article/ns1:abstract}
                    {$article/ns1:info}       
                </ns1:article>
    `;