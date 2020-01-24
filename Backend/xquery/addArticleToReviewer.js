module.exports.query = (email, articleURI) => `xquery version "3.1";
declare function local:getUser($email as xs:string)
{
    (for $user in collection("/db/scientificArticles/users/")/user
    where $user/email//text() = $email
    return $user)[1]
};
let $email := "${email}"

return update insert <articleId>${articleURI}</articleId>
    into local:getUser($email)//toReview
`