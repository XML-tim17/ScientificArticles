module.exports = (rdfSubject, dateAccepted) => `
    PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 
    PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    DELETE { ${rdfSubject} rdfa:datePublished ?current_datePublished }
    INSERT { ${rdfSubject} rdfa:datePublished "${dateAccepted.toString().replace(/"/g, '\\"')}"^^rdf:XMLLiteral }
    WHERE
    { 
        ${rdfSubject} rdfa:datePublished ?current_datePublished
    }`;