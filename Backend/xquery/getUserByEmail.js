module.exports.query = (email) => 
`
xquery version "3.1";
    for $user in collection("/db/scientificArticles/users/")/user
    where $user/email//text() = "${email}"
    return $user
`
