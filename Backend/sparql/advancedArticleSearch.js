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
    ${searchParams.status ? `?status = "${searchParams.status}" ^^rdf:XMLLiteral &&` : ``}
    ${searchParams.dateCreatedFrom ? `?dateCreated >= "${searchParams.dateCreatedFrom}" ^^xsd:date &&` : ``}
    ${searchParams.dateCreatedTo ? `?dateCreated >= "${searchParams.dateCreatedTo}" ^^xsd:date &&` : ``}
    ${searchParams.datePublishedFrom ? `?datePublished >= "${searchParams.datePublishedFrom}"^^xsd:date &&` : ``}
    ${searchParams.datePublishedTo ? `?datePublished >= "${searchParams.datePublishedTo}" ^^xsd:date &&` : ``}
    ${searchParams.headline ? `CONTAINS(UCASE(str(?headline)), UCASE("${searchParams.headline}")) &&` : ''}
    ${searchParams.keywords ? `CONTAINS(UCASE(str(?keywords)), UCASE("${searchParams.keywords}")) &&` : ''}
    ${searchParams.reference ? `?reference = "${searchParams.reference}" ^^rdf:XMLLiteral &&` : ``}
    ?article = ?article
    ).
}`
// line "?article = ?article" enables us to put '&&' in every line without need to check if it is the last one