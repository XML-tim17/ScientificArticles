module.exports.query = () => `xquery version "3.1";
for $user in collection("/db/scientificArticles/users/")/user
    return $user`