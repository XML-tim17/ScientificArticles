var express = require('express');
var router = express.Router();
var authorsService = require('../service/authorsService');
const authorizationService = require('../service/authorizationService')

// get all articles for author (revision?)
// AUTHOR
router.get('/:authorId/articles/:status', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.author)) {
            res.send("Unauthorized");
            return;
        }
        // check if user has access
        let articles = await this.authorsService.getArticles(req.params.authorId, req.params.status);
        res.send(articles);
    } catch (e) {
        res.send(e.message);
    }
})

// get all authors ranked by correspondance with article
// EDITOR
router.get('/:articleId', async (req, res) => {
    try {
        if(!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
            res.send("Unauthorized");
            return;
        }
        let authors = await this.authorsService.getCorresponcingAuthors(req.params.articleId);
        res.send(authors);
    } catch (e) {
        res.send(e.message);
    }
})

module.exports = router;