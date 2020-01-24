var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var reviewsService = require('../service/reviewsService');
var articlesService = require('../service/articleService');
var validator = require('xsd-schema-validator');
const reviewSchemaLocation = 'resources/XMLSchemas/Review.xsd';
const authorizationService = require('../service/authorizationService')

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
router.post('', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.reviewer)) {
            res.send("Unauthorized");
            return;
        }
        let valid = validateDocument(req.body.data);
        if (!valid) {
            throw new Error('Invalid review, document does not match required scheme.')
        }
        await reviewsService.postReview(req.body.data);
        res.send('created')
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
});


// get article to review
// REVIEWER
router.get('/:reviewerId/articles', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.reviewer)) {
            res.send("Unauthorized");
            return;
        }
        let articles = await this.articlesService.getArticlesToReview(reviewerId);
        res.send(articles);
    } catch (e) {
        res.send(e.message);
    }
})

// // get single review
// // AUTHOR
// router.get('/:reviewId', async (req, res) => {
//     try {
//         var dom = await reviewsService.readXML(req.params.reviewId);
//         var document = new XMLSerializer().serializeToString(dom)
//         res.send(document);
//     } catch (e) {
//         res.send(e.message);
//     }
// });

module.exports = router;