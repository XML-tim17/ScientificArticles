var express = require('express');
var router = express.Router();
var questionnaireRepository = require('../repository/questionnaireRepository');

router.post('', (req, res) => {
    questionnaireRepository.saveXML(req.body.data);
    res.send('resource created');
});

router.get('/:questionnaireId', async (req, res) => {
    res.send(await questionnaireRepository.readXML(req.params.questionnaireId));
});

module.exports = router;