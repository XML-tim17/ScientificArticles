var express = require('express');
var router = express.Router();
var articlesRepository = require('../repository/articlesRepository');

router.post('', (req, res) => {
    articlesRepository.saveXML(req.body.data);
    res.send('resource created');
});

router.get('/:documentId', async (req, res) => {
    res.send(await articlesRepository.readXML(req.params.documentId));
});

module.exports = router;