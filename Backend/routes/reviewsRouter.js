var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var reviewsService = require('../service/reviewsService');
var articlesService = require('../service/articleService');
var validator = require('xsd-schema-validator');
var fs = require('fs');
const reviewSchemaLocation = 'resources/XMLSchemas/Review.xsd';
const authorizationService = require('../service/authorizationService')
const pdfService = require('../service/pdfService');
const xsltService = require('../service/xsltService');
const validateDocument = (xml) => {
    return new Promise((resolve, reject) => {
        validator.validateXML(xml, reviewSchemaLocation, (err, data) => {
          if (err) return reject(err)
          resolve(data.valid)
        });
      });
}

// post review
// REVIEWER
router.post('', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.reviewer)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        let valid = validateDocument(req.body.data);
        if (!valid) {
            throw new Error('Invalid review, document does not match required scheme.')
        }
        await reviewsService.postReview(req.body.data, req.user);
        res.send('created')
    } catch (e) {
        console.log(e);
        next(e);
    }
});


// get articles to review
// REVIEWER
router.get('/toReview', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.reviewer)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        let articles = await articlesService.getArticlesToReview(req.user);
        res.send(await reviewsService.articlesToListItemHtml(articles));
    } catch (e) {
        next(e);
    }
})

// assign reviewers to article
// EDITOR
// expected json body { reviewers: [] }
router.post('/assign/article/:articleId', async (req, res, next) => {
    try {
        
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }

        await reviewsService.assignReviewers(req.params.articleId, req.body.reviewers)
        res.send({status: "success"});
        
    } catch (e) {
        next(e);
    }
})


router.get('/pdf/:articleId/:token', async (req, res, next) => {
    try {
        const mergedXml = await reviewsService.getReviewsForArticle(req.params.articleId);
        let xslfoString = fs.readFileSync('./xsl-fo/article-reviews-merged-xslfo.xsl', 'utf8');
        
        let bindata = await pdfService.transform(mergedXml, xslfoString)
        res.contentType("application/pdf");
        res.send(bindata);
        
    } catch (e) {
        next(e);
    }
})

router.get('/html/:articleId/', async (req, res, next) => {
    try {
        const mergedXml = await reviewsService.getReviewsForArticle(req.params.articleId);
        let xslfoString = fs.readFileSync('./xsl/article-reviews-merged.xsl', 'utf8');
        
        let htmlString = await xsltService.transform(mergedXml, xslfoString)
        res.send({data: htmlString});
        
    } catch (e) {
        next(e);
    }
})

// // get single review
// // AUTHOR
// router.get('/:reviewId', async (req, res, next) => {
//     try {
//         var dom = await reviewsService.readXML(req.params.reviewId);
//         var document = new XMLSerializer().serializeToString(dom)
//         res.send(document);
//     } catch (e) {
//         next(e);
//     }
// });

module.exports = router;