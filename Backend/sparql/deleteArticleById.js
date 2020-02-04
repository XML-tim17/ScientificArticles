module.exports = (rdfSubject) => `
    PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 

    DELETE { ${rdfSubject} ?s ?d }
    WHERE { ${rdfSubject} ?s ?d }`;
