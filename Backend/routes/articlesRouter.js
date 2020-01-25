var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var articlesService = require('../service/articleService');
var validator = require('xsd-schema-validator');
const articleSchemaLocation = 'resources/XMLSchemas/Article.xsd';
const authorizationService = require('../service/authorizationService')

const validateDocument = (xml) => {
    return new Promise((resolve, reject) => {
        validator.validateXML(xml, articleSchemaLocation, (err, data) => {
          if (err) return reject(err)
          resolve(data.valid)
        });
      });
}
// get all published articles
// GUEST
router.get('', async (req, res) => {
    try {
        var documents = await articlesService.getAll();
        res.send(documents);
    } catch (e) {
        res.send(e.message);
    }
});


// post new article
// AUTHOR
router.post('', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            res.send("Unauthorized");
            return;
        }
        let valid = await validateDocument(req.body.data);
        if (valid) {
            let result = await articlesService.addNewArticle(req.body.data);
            res.send(result)
        } else {
            throw Error('Document is not valid according to schema.');
        }
    } catch (e) {
        res.send(e.message);
    }
});

// get all articles in toBeReviewed state
// EDITOR
router.get('/toBeReviewed', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            res.send("Unauthorized");
            return;
        }
        var articles = await articlesService.toBeReviewed();
        res.send(articles);
    } catch (e) {
        res.send(e.message);
    }
});

// basic search
// single url param q="search string"
// GUEST
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
// GUEST
router.post('/search', async (req, res) => {
    try {
        let result = await articlesService.advancedSearch(req.body.data);
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
})

// get article by id (last version)
// AUTHOR
router.get('/:documentId', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            res.send("Unauthorized");
            return;
        }
        // check if user has access to article
        var lastVersion = await articlesService.getLastVersion(+req.params.documentId);
        var dom = await articlesService.readXML(+req.params.documentId, lastVersion);
        var document = new XMLSerializer().serializeToString(dom)
        res.send(document);
    } catch (e) {
        res.send(e.message);
    }
});

// post revision
// AUTHOR
router.post('/:articleId', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            res.send("Unauthorized");
            return;
        }
        let valid = await validateDocument(req.body.data);
        if (valid) {
            let result = await articlesService.postRevision(+req.params.articleId, req.body.data);
            res.send(result)
        } else {
            throw Error('Document is not valid according to schema.');
        }
    } catch (e) {
        res.send(e.message);
    }
});



// get all reviews for given article
// AUTHOR
router.get('/:articleId/reviews', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            res.send("Unauthorized");
            return;
        }
        // check if user has access to this article
        var reviews = await articlesService.getReviews(+req.params.articleId);
        res.send(reviews);
    } catch(e) {
        res.send(e.message);
    }
})

// change status of article
// UREDNIK
router.get('/:articleId/status/:status', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            res.send("Unauthorized");
            return;
        }
        await articlesService.setStatus(+req.params.articleId, req.params.status);
        res.send("success")
    } catch (e) {
        res.send(e.message);
    }
})

// request revision of article
// EDITOR
router.get('/:articleId/requestRevision', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        await articlesService.requestRevision(req.params.articleId);
        res.send("success");


    } catch (e) {
        next(e);
    }
})

module.exports = router;






