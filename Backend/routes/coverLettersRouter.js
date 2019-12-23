var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var coverLetterService = require('../service/coverLetterService');

router.post('', async (req, res) => {
    var dom = new DOMParser().parseFromString(req.body.data, 'text/xml');
    try{
        await coverLetterService.saveXML(dom);
        res.send('created')
    } catch (e) {
        res.send(e.message);
    }
});

router.get('/:coverLetterId', async (req, res) => {
    try{
        var dom = await coverLetterService.readXML(req.params.coverLetterId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;