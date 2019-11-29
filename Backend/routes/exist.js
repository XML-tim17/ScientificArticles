var express = require('express');
var router = express.Router();
var exist = require('../repository/exist-repository')

/* GET home page. */
router.get('/create', (req, res) => {
    exist.createCollection();
    res.send('collection created');
})
module.exports = router;