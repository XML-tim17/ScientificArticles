var express = require('express');
var xmldom = require('xmldom');
var XMLSerializer = xmldom.XMLSerializer;
var DOMParser = xmldom.DOMParser;
var router = express.Router();
var reviewsService = require('../service/reviewsService');
var articlesService = require('../service/articleService');


// post review
// REVIEWER
router.post('', async (req, res) => {
    try {
        await reviewsService.postReview(req.body.data);
        res.send('created')
    } catch (e) {
        res.send(e.message);
    }
});


// get article to review
// REVIEWER
router.get('/:reviewerId/articles', async (req, res) => {
    try {
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