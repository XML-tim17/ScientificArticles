module.exports = (rdfSubject, status) => `PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 

        DELETE { ${rdfSubject} rdfa:creativeWorkStatus ?current_status }
        INSERT { ${rdfSubject} rdfa:creativeWorkStatus "${status}" }
        WHERE
        { 
            ${rdfSubject} rdfa:creativeWorkStatus ?current_status
        }`;