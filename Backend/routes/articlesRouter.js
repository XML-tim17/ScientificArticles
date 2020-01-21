var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var articlesService = require('../service/articleService');


// get article by id
// AUTHOR
router.get('/:documentId', async (req, res) => {
    try {
        // check if user has access to article
        var dom = await articlesService.readXML(req.params.documentId);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

// get all published articles
// VISITOR
router.get('', async (req, res) => {
    try {
        var documents = await articlesService.getAll();
        res.send(documents);
    } catch (e) {
        res.send(e.message);
    }
});

// get all reviews for given article
// AUTHOR
router.get('/:articleId/reviews', async (req, res) => {
    try {
        // check if user has access to this article
        var reviews = await articlesService.getReviews(req.params.articleId);
        res.send(reviews);
    } catch(e) {
        res.send(e.message);
    }
})

// get all articles in toBeReviewed state
// EDITOR
router.get('/toBeReviewed', async (req, res) => {
    try {
        var articles = await articlesService.getToBeReviewed();
        res.send(articles);
    } catch (e) {
        res.send(e.message);
    }
});

// post new article
// AUTHOR
router.post('', async (req, res) => {
    try {
        let result = await articlesService.saveXML(req.body.data);
        res.send(result)
    } catch (e) {
        res.send(e.message);
    }
});

// post revision
// AUTHOR
router.post('/:articleId', async (req, res) => {
    try {
        let result = await articlesService.postRevision(req.params.articleId, req.body.data);
        res.send(result)
    } catch (e) {
        res.send(e.message);
    }
});

// basic search
// single url param q="search string"
// VISITOR
router.get('/search', async (req, res) => {
    try {
        let result = await articlesService.basicSearch(req.param('q'))
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
})

// advanced search (rdf metadata)
// body params
// VISITOR
router.post('/search', async (req, res) => {
    try {
        let result = await articlesService.advancedSearch(req.body.data);
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
})

// change status of article
// UREDNIK
router.put('/:articleId/status/:status', async (req, res) => {
    try {
        await articlesService.setStatus(articleId, status);
        res.send("success")
    } catch (e) {
        res.send(e.message);
    }
})

module.exports = router;