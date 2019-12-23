var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var questionnaireService = require('../service/questionnaireService');

router.post('', async (req, res) => {
    try {
        await questionnaireService.saveXML(req.body.data);
        res.send('created')
    } catch (e) {
        res.send(e.message);
    }
});

router.get('/:questionnaireId', async (req, res) => {
    try {
        var dom = await questionnaireService.readXML(req.params.questionnaireId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;