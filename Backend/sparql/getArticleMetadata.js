module.exports = (rdfSubject) => `
    PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 
    PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?subject ?predicate ?object
    WHERE {
    ${rdfSubject} ?predicate ?object
    }
`
