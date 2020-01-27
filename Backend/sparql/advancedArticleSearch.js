module.exports = (searchParams) => `PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 
    PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT DISTINCT ?articleID
    WHERE {
    ?article rdfa:abstract ?abstract.
    ?article rdfa:author ?author.
    ?article rdfa:creativeWorkStatus ?status.
    ?article rdfa:dateCreated ?dateCreated.
    ?article rdfa:datePublished ?datePublished.
    ?article rdfa:headline ?headline.
    ?article rdfa:keywords ?keywords.
    ?article rdfa:citation ?reference.
    ?article rdfa:identifier ?articleID.
      
    FILTER (
    ${searchParams.abstract ? `CONTAINS(UCASE(str(?abstract)), UCASE("${searchParams.abstract}")) &&` : ''}
    ${searchParams.author ? `CONTAINS(UCASE(str(?author)), UCASE("${searchParams.author}")) &&` : ''}
    ${searchParams.dateCreated.startDate ? `?dateCreated >= "${searchParams.dateCreated.startDate}"^^xsd:dateTime &&` : ``}
    ${searchParams.dateCreated.endDate ? `?dateCreated <= "${searchParams.dateCreated.endDate}"^^xsd:dateTime &&` : ``}
    ${searchParams.datePublished.startDate ? `?datePublished >= "${searchParams.datePublished.startDate}"^^xsd:dateTime &&` : ``}
    ${searchParams.datePublished.endDate ? `?datePublished <= "${searchParams.datePublished.endDate}"^^xsd:dateTime &&` : ``}
    ${searchParams.headline ? `CONTAINS(UCASE(str(?headline)), UCASE("${searchParams.headline}")) &&` : ''}
    ${searchParams.keywords ? `CONTAINS(UCASE(str(?keywords)), UCASE("${searchParams.keywords}")) &&` : ''}
    ${searchParams.reference ? `?reference = "${searchParams.reference}"^^rdf:XMLLiteral &&` : ``}
    ?status = "accepted"^^rdf:XMLLiteral
    ).
}`
