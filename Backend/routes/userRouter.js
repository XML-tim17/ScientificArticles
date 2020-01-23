
var userService = require('../service/userService');
var express = require('express');
var router = express.Router();


router.get('/', async (req, res) => {
    try {
        var user = await userService.getUserByEmail(req.param('email'));
        res.send(user);
    } catch (e) {
        res.send(e.message);
    }
});

router.get('/password', async (req, res) => {
    try {
        var password = await userService.getPaswordOf(req.body.email);
        res.send(password);
    } catch (e) {
        res.send(e.message);
    }
});


module.exports = router;