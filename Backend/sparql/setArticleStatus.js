module.exports = (rdfSubject, status) => `
    PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 
    PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    DELETE { ${rdfSubject} rdfa:creativeWorkStatus ?current_status }
    INSERT { ${rdfSubject} rdfa:creativeWorkStatus "${status.toString().replace(/"/g, '\\"')}"^^rdf:XMLLiteral }
    WHERE
    { 
        ${rdfSubject} rdfa:creativeWorkStatus ?current_status
    }`;