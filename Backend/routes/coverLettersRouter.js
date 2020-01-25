var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var coverLetterService = require('../service/coverLetterService');

router.post('', async (req, res) => {
    try {
        await coverLetterService.saveXML(req.body.data);
        res.send('created')
    } catch (e) {
        next(e);
    }
});

router.get('/:coverLetterId', async (req, res) => {
    try {
        var dom = await coverLetterService.readXML(req.params.coverLetterId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        next(e);
    }
});

module.exports = router;