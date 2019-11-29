const exist = require('@existdb/node-exist')
const options = {
    host: 'localhost',
    port: '8080',
    basic_auth: {
        user: 'admin',
        pass: '',
    }
}
const db = exist.connect(options)

module.exports.upload = (fileName) => {
    db.documents.upload(Buffer.from('<a href="hehe"></a>'))
    .then(fileHandle => db.documents.parseLocal(fileHandle, '/db/apps/test/test.xml', {}))
    .catch(e => console.error('fail', e))
}


module.exports.retrieveAll = async () => {
    let result = await db.documents.read('/db/apps/test/test.xml', {})
    let data = {
        fileName:'test.xml',
        content:XMLDocument.parse(result.toString())    
    }
    console.log(data);
    return data;
}