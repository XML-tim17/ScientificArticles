module.exports.query = (ids) => `
xquery version "3.1";
declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
declare namespace functx = "http://www.functx.com";
declare function functx:is-value-in-sequence
  ( $value as xs:anyAtomicType? ,
    $seq as xs:anyAtomicType* )  as xs:boolean {

   $value = $seq
 } ;
declare variable $ids := (${ids});
for $article in collection("/db/scientificArticles/articles/")/ns1:article
where $article/ns1:info/ns1:status/text() = "accepted" and functx:is-value-in-sequence($article/ns1:id/text(),$ids)
    return $article
    `;