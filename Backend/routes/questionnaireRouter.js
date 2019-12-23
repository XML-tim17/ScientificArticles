var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var questionnaireService = require('../service/questionnaireService');

router.post('', async (req, res) => {
    var dom = new DOMParser().parseFromString(req.body.data, 'text/xml');
    try{
        await questionnaireService.saveXML(dom);
        res.send('created')
    } catch (e) {
        res.send(e.message);
    }
});

router.get('/:questionnaireId', async (req, res) => {
    try{
        var dom = await questionnaireService.readXML(req.params.questionnaireId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;