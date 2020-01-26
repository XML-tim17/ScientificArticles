module.exports = (rdfSubject, articleId) => `PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 

        DELETE { ${rdfSubject} rdfa:identifier ?current_identifier }
        INSERT { ${rdfSubject} rdfa:identifier "${articleId}" }
        WHERE
        { 
          ${rdfSubject} rdfa:identifier ?current_identifier
        }`;