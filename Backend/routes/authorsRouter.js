var express = require('express');
var router = express.Router();
var authorsService = require('../service/authorsService');
const authorizationService = require('../service/authorizationService')

// get all articles for author (revision?)
// AUTHOR
router.get('/articles/:status', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        // check if user has access
        let articles = await authorsService.getArticles(req.user.email, req.params.status);
        res.send(articles);
    } catch (e) {
        next(e);
    }
})

// get all authors ranked by correspondance with article
// EDITOR
router.get('/:articleId', async (req, res, next) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            let error = new Error('Unauthorized')
            error.status = 403;
            next(error);
            return;
        }
        let authors = await authorsService.getCorresponcingAuthors(req.params.articleId);
        res.send(authors);
    } catch (e) {
        next(e);
    }
})


module.exports = router;