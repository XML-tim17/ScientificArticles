var express = require('express');
var router = express.Router();
var articlesRepository = require('../repository/articlesRepository');

router.post('/save', (req, res) => {
    console.log(req.body.data);
    articlesRepository.saveXML(req.body.data);
    res.send('resource created');
});

router.get('/:documentName', async (req, res) => {
    res.send(await articlesRepository.readXML(req.params.documentName));
});

module.exports = router;