var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var reviewService = require('../service/reviewService');

router.post('', async (req, res) => {
    var dom = new DOMParser().parseFromString(req.body.data, 'text/xml');
    try{
        await reviewService.saveXML(dom);
        res.send('created')
    } catch (e) {
        res.send(e.message);
    }
});

router.get('/:reviewId', async (req, res) => {
    try{
        var dom = await reviewService.readXML(req.params.reviewId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;