var express = require('express');
var router = express.Router();
var exist = require('../repository/existRepository')
let testrepo = require('../repository/test-repository')

/* GET home page. */
router.get('/create', (req, res) => {
    exist.createCollection();
    res.send('collection created');
})

router.get('/upload', (req, res) => {
    testrepo.upload('test.xml');
    res.send('test.xml uploaded')
})


router.get('/retrieveAll', async (req, res) => {

    res.send(await testrepo.retrieveAll());
})
module.exports = router;