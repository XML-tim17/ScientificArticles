var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var reviewsService = require('../service/reviewsService');

router.post('', async (req, res) => {
    try {
        await reviewsService.saveXML(req.body.data);
        res.send('created')
    } catch (e) {
        res.send(e.message);
    }
});

router.get('/:reviewId', async (req, res) => {
    try {
        var dom = await reviewsService.readXML(req.params.reviewId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;