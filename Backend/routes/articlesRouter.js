var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var articlesService = require('../service/articleService');
var pdfService = require('../service/pdfService');
var validator = require('xsd-schema-validator');
const articleSchemaLocation = 'resources/XMLSchemas/Article.xsd';
const authorizationService = require('../service/authorizationService')
const fs = require('fs');
const xsltService = require('../service/xsltService');

const validateDocument = (xml) => {
    return new Promise((resolve, reject) => {
        validator.validateXML(xml, articleSchemaLocation, (err, data) => {
          if (err) return reject(err)
          resolve(data.valid)
        });
      });
}

// get pdf of article
// GUEST
router.get('/pdf/:articleId/:token', async(req,res, next) => {
    try {
        if (req.user.role === authorizationService.roles.guest) {
            req = await authorizationService.getUserFromTokenParam(req);
        }

        let bindata = await articlesService.getArticlePDF(+req.params.articleId, req.user)
        res.contentType("application/pdf");
        res.send(bindata);
    } catch (e) {
        next(e);
    }
});

// get all published articles
// GUEST
router.get('', async (req, res, next) => {
    try {
        var documents = await articlesService.getAll();
        res.send(documents);
    } catch (e) {
        next(e);
    }
});


// post new article
// AUTHOR
router.post('', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        let valid = await validateDocument(req.body.data);
        if (valid) {
            let result = await articlesService.addNewArticle(req.body.data, req.user);
            res.send(result)
        } else {
            throw Error('Document is not valid according to schema.');
        }
    } catch (e) {
        next(e);
    }
});

// get all articles in toBeReviewed state
// EDITOR
// router.get('/toBeReviewed', async (req, res, next) => {
//     try {
//         if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
//             let error = new Error('Unauthorized')
//             error.status = 403;
//             next(error);
//             return;
//         }
//         var articles = await articlesService.toBeReviewed();
//         res.send(articles);
//     } catch (e) {
//         next(e);
//     }
// });

// get all articles by status
// EDITOR
router.get('/status/:status', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        var articles = await articlesService.getAllByStatus(req.params.status);
        res.send(articles);
    } catch (e) {
        next(e);
    }
});

// basic search
// single url param q="search string"
// GUEST
router.get('/search', async (req, res, next) => {
    try {
        let result = await articlesService.basicSearch(req.param('q'))
        res.send(result);
    } catch (e) {
        next(e);
    }
})

// advanced search (rdf metadata)
// body params
// GUEST
router.post('/search', async (req, res, next) => {
    try {
        let result = await articlesService.advancedSearch(req.body.data);
        res.send(result);
    } catch (e) {
        next(e);
    }
})

// get article html by id (last version)
// AUTHOR
router.get('/html/:documentId', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }

        let articleHTML = await articlesService.getArticleHTML(req.params.documentId, req.user);
        res.send({data: articleHTML});
    } catch (e) {
        next(e);
    }
});


// get article by id (last version)
// AUTHOR
router.get('/:documentId', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        // check if user has access to article
        var lastVersion = await articlesService.getLastVersion(+req.params.documentId);
        var dom = await articlesService.readXML(+req.params.documentId, lastVersion);
        var document = new XMLSerializer().serializeToString(dom)

        res.send({data: document});
    } catch (e) {
        next(e);
    }
});

// post revision
// AUTHOR
router.post('/:articleId', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        let valid = await validateDocument(req.body.data);
        if (valid) {
            let result = await articlesService.postRevision(+req.params.articleId, req.body.data, req.user);
            res.send(result)
        } else {
            throw Error('Document is not valid according to schema.');
        }
    } catch (e) {
        next(e);
    }
});



// get all reviews for given article
// AUTHOR
router.get('/:articleId/reviews', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        // check if user has access to this article
        var reviews = await articlesService.getReviews(+req.params.articleId);
        res.send(reviews);
    } catch(e) {
        next(e);
    }
})

// change status of article
// UREDNIK
router.get('/:articleId/status/:status', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        await articlesService.setStatus(+req.params.articleId, req.params.status);
        res.send({status: "success"})
    } catch (e) {
        next(e);
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
        res.send({status: "success"});


    } catch (e) {
        next(e);
    }
})

// give up on article
// AUTHOR
router.get('/:articleId/giveUp', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }

        let status = await articlesService.giveUp(req.params.articleId, req.user);
        res.send( { status })

    } catch (e) {
        next(e);
    }
})

module.exports = router;






