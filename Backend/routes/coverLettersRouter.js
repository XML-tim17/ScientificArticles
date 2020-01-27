var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var coverLetterService = require('../service/coverLetterService');
const authorizationService = require('../service/authorizationService')
const fs = require('fs');
const xsltService = require('../service/xsltService');
var articlesService = require('../service/articleService');
var pdfService = require('../service/pdfService');

router.post('', async (req, res, next) => {
    try {
        await coverLetterService.saveXML(req.body.data);
        res.send('created')
    } catch (e) {
        next(e);
    }
});

// get cover letter html
// AUTHOR
router.get('/html/:articleId', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        var lastVersion = await articlesService.getLastVersion(+req.params.articleId);
        var dom = await coverLetterService.readXML(+req.params.articleId, lastVersion);
        var document = new XMLSerializer().serializeToString(dom)
        let xsltString = fs.readFileSync('./xsl/cover-letter-html.xsl', 'utf8');
        let coverLetterHtml = await xsltService.transform(document, xsltString);
        res.send({data: coverLetterHtml});
    } catch (e) {
        next(e);
    }
});

// get cover letter pdf
// AUTHOR
router.get('/pdf/:articleId/:token', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }

        var lastVersion = await articlesService.getLastVersion(+req.params.articleId);
        var dom = await coverLetterService.readXML(+req.params.articleId, lastVersion);
        var xmlString = new XMLSerializer().serializeToString(dom)
        let xslfoString = fs.readFileSync('./xsl-fo/cover-letter-xslfo.xsl', 'utf8');

        let bindata = await pdfService.transform(xmlString, xslfoString)
        res.contentType("application/pdf");
        res.send(bindata);
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;