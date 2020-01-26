module.exports.query = (matchingTitle) => `
    xquery version "3.1";
    declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
    declare function local:tolower($lista){
      for $elem in $lista
      return lower-case($elem)
    };
    for $article in collection("/db/scientificArticles/articles/")/ns1:article
    where contains(local:tolower($article//*[not(name()='ns1:image')]/text()), lower-case("${matchingTitle}")) and $article/ns1:info/ns1:status/text() = "accepted"
        return $article
    `;