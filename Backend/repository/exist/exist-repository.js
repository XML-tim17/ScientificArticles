const exist = require('@existdb/node-exist')
const config = require('config.js')


module.exports.createCollection = () => {
    const db = exist.connect(config.options)
    db.collections.create('/db/apps/test')
    .then(result => db.collections.describe('/db/apps/test'))
    .then(result => console.log('collection description:', result))
    .catch(e => console.error('fail', e))
}
