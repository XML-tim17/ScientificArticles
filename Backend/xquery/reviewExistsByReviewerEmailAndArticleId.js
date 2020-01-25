module.exports.query = (articleURI, email) => `xquery version "3.1";
declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";

let $articleURI := "${articleURI}"
let $email := "${email}"
return count(for $review in collection("/db/scientificArticles/reviews")/ns1:review
    where $review//ns1:reviewer/ns1:email = $email and $review//ns1:article-id = $articleURI
    return $review) > 0`