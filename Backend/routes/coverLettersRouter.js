var express = require('express');
var router = express.Router();
var coverLettersRepository = require('../repository/coverLettersRepository');

router.post('', (req, res) => {
    coverLettersRepository.saveXML(req.body.data);
    res.send('resource created');
});

router.get('/:coverLetterId', async (req, res) => {
    res.send(await coverLettersRepository.readXML(req.params.coverLetterId));
});

module.exports = router;