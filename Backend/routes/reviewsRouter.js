var express = require('express');
var router = express.Router();
var reviewsRepository = require('../repository/reviewsRepository');

router.post('', (req, res) => {
    reviewsRepository.saveXML(req.body.data);
    res.send('resource created');
});

router.get('/:reviewId', async (req, res) => {
    res.send(await reviewsRepository.readXML(req.params.reviewId));
});

module.exports = router;