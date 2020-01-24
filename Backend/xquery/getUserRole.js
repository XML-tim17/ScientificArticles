module.exports.query = (email) => `xquery version "3.1";
declare function local:getUser($email as xs:string)
{
    (for $user in collection("/db/scientificArticles/users/")/user
    where $user/email//text() = $email
    return $user)[1]
};

let $email := "${email}"
return local:getUser($email)//role//text()`