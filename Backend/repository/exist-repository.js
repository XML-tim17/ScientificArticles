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

module.exports.createCollection = () => {
    db.collections.create('/db/apps/test')
    .then(result => db.collections.describe('/db/apps/test'))
    .then(result => console.log('collection description:', result))
    .catch(e => console.error('fail', e))
}
