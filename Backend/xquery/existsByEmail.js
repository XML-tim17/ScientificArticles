module.exports.query = (email) =>
    `
xquery version "3.1";

declare function local:x() {
    for $user in collection("/db/scientificArticles/users/")/user
    where $user/email//text() = "${email.toString().replace(/"/g, '""')}"
    return count($user)
};

let $zero := 0
return local:x() or $zero
`