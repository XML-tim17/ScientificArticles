var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var articlesService = require('../service/articleService');

router.post('', async (req, res) => {
    try {
        let result = await articlesService.saveXML(req.body.data);
        res.send(result)
    } catch (e) {
        res.send(e.message);
    }
});

router.get('/:documentId', async (req, res) => {
    try {
        var dom = await articlesService.readXML(req.params.documentId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;