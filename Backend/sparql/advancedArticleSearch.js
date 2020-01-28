module.exports = (searchParams) => `
    PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 
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
    ${searchParams.abstract ? `CONTAINS(UCASE(str(?abstract)), UCASE("${searchParams.abstract.toString().replace(/"/g, '\\"')}")) &&` : ''}
    ${searchParams.author ? `CONTAINS(UCASE(str(?author)), UCASE("${searchParams.author.toString().replace(/"/g, '\\"')}")) &&` : ''}
    ${searchParams.dateCreated.startDate ? `?dateCreated >= "${searchParams.dateCreated.startDate.toString().replace(/"/g, '\\"').substr(0, 10)}"^^xsd:date &&` : ``}
    ${searchParams.dateCreated.endDate ? `?dateCreated <= "${searchParams.dateCreated.endDate.toString().replace(/"/g, '\\"').substr(0, 10)}"^^xsd:date &&` : ``}
    ${searchParams.datePublished.startDate ? `?datePublished >= "${searchParams.datePublished.startDate.toString().replace(/"/g, '\\"').substr(0, 10)}"^^xsd:date &&` : ``}
    ${searchParams.datePublished.endDate ? `?datePublished <= "${searchParams.datePublished.endDate.toString().replace(/"/g, '\\"').substr(0, 10)}"^^xsd:date &&` : ``}
    ${searchParams.headline ? `CONTAINS(UCASE(str(?headline)), UCASE("${searchParams.headline.toString().replace(/"/g, '\\"')}")) &&` : ''}
    ${searchParams.keywords ? `CONTAINS(UCASE(str(?keywords)), UCASE("${searchParams.keywords.toString().replace(/"/g, '\\"')}")) &&` : ''}
    ${searchParams.reference ? `?reference = "${searchParams.reference.toString().replace(/"/g, '\\"')}"^^rdf:XMLLiteral &&` : ``}
    ?status = "accepted"^^rdf:XMLLiteral
    ).
}`
