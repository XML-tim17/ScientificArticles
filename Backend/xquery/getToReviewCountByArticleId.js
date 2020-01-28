module.exports.query = (articleId) => `xquery version "3.1";
declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";

declare function local:articleExists($reviewer, $articleId as xs:string) {
    for $id in $reviewer/toReview/articleId
    where $id = $articleId
    return $id
};

declare function local:getReviewers($articleId as xs:string) {
    for $reviewer in collection("/db/scientificArticles/users/")/user
    where count(local:articleExists($reviewer, $articleId)) > 0
    return $reviewer
};

let $articleId := "${articleId.toString().replace(/"/g, '""')}"

return count(local:getReviewers($articleId))
`