module.exports.query = (email, role) => `xquery version "3.1";
declare function local:getUser($email as xs:string)
{
    (for $user in collection("/db/scientificArticles/users/")/user
    where $user/email//text() = $email
    return $user)[1]
};

let $email := "${email.toString().replace(/"/g, '""')}"

return update replace local:getUser($email)//role//text() with "${role.toString().replace(/"/g, '""')}"` 