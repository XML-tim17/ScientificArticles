const exist = require('@existdb/node-exist')
const config = require('./config')
const collectionsURI = '/db/scientificArticles';

module.exports.createCollections = () => {
    const db = exist.connect(config.options);

    db.collections.create(`${collectionsURI}/articles`)
        .catch(e => console.error('fail', e));

    db.collections.create(`${collectionsURI}/coverLetters`)
        .catch(e => console.error('fail', e));

    db.collections.create(`${collectionsURI}/questionaires`)
        .catch(e => console.error('fail', e));

    db.collections.create(`${collectionsURI}/reviews`)
        .catch(e => console.error('fail', e));

    db.collections.create(`${collectionsURI}/user`)
        .catch(e => console.error('fail', e));

    db.collections.create(`${collectionsURI}/utilty`)
        .catch(e => console.error('fail', e));

}