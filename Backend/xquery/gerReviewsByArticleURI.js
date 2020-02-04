module.exports.query = (articleURI) => `xquery version "3.1";
declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
declare function local:getReviews($articleId as xs:string) {
    for $review in collection("/db/scientificArticles/reviews/")/ns1:review
    where $review//ns1:article-id//text() = $articleId 
    return $review
};
let $articleId := "${articleURI.toString().replace(/"/g, '""')}"

return count(local:getReviews($articleId))`