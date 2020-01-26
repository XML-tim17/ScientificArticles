const axios = require('axios');
const FormData = require('form-data');
const baseUrl = require('./rdfConfig');
const querystring = require('querystring');
const memfs = require('memfs');
const datasetName = 'articlesDS';
const rdfSubjectBase = 'https://github.com/XML-tim17/ScientificArticles';


module.exports.createDataset = () => {
    axios.post(`${baseUrl}/$/datasets`, querystring.stringify({
        dbName: datasetName,
        dbType: 'tdb'
    }))
        .catch(e => { if (e.response.status != 409) console.log(e) }); // 409 is sent if dataset already exists
}

module.exports.saveRDFxml = async (rdfXML) => {
    const fileName = 'rdfXML.xml';
    memfs.writeFileSync(`/${fileName}`, rdfXML);

    const formData = new FormData();
    formData.append('files[]', memfs.readFileSync(`/${fileName}`), {
        filename: fileName,
        contentType: 'text/xml'
    });
    const config = {
        headers: {
            ...formData.getHeaders()
        }
    };
    await axios.post(`${baseUrl}/${datasetName}/data`, formData.getBuffer(), config).catch(e => { console.log(e) });
}

module.exports.setStatus = async (articleId, version, status) => {
    const rdfSubject = `${rdfSubjectBase}/${articleId}/${version}`;
    let updateSPARQL = `PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 
        PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 

        DELETE { ${rdfSubject} rdfa:creativeWorkStatus ?current_status }
        INSERT { ${rdfSubject} rdfa:creativeWorkStatus ${status} }
        WHERE
        { 
            ${rdfSubject} rdfa:creativeWorkStatus ?current_status
        } `;
    await axios.post(`${baseUrl}/${datasetName}/update`, querystring.stringify({
        update: updateSPARQL
    }))
        .catch(e => { console.log(e) });
}

module.exports.updateArticleId = async (articleId, version) => {
    const rdfSubject = `${rdfSubjectBase}/${articleId}/${version}`;
    let updateSPARQL = `PREFIX rdfa: <http://www.w3.org/ns/rdfa#> 
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 

        DELETE { ${rdfSubject} rdfa:identifier ?current_identifier }
        INSERT { ${rdfSubject} rdfa:identifier ${articleId} }
        WHERE
        { 
          ${rdfSubject} rdfa:identifier ?current_identifier
        }`;
    await axios.post(`${baseUrl}/${datasetName}/update`, querystring.stringify({
        update: updateSPARQL
    }))
        .catch(e => { console.log(e) });
}
