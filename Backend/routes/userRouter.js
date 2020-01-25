
var userService = require('../service/userService');
var express = require('express');
var router = express.Router();


router.get('/', async (req, res) => {
    try {
        var user = await userService.getUserByEmail(req.param('email'));
        res.send(user);
    } catch (e) {
        next(e);
    }
});

router.get('/password', async (req, res) => {
    try {
        var password = await userService.getPaswordOf(req.body.email);
        res.send(password);
    } catch (e) {
        next(e);
    }
});

// expected json object of user
// {
//     "name": "Nenad Misic",
//     "institution": "FTN",
//     "phoneNumber": "0652772886",
//     "email": "nenad.misic@gmail.com",
//     "address": {
//         "city": "Novi Sad",
//         "country": "Serbija"
//     }
// }
router.post('/register', async (req, res) => {
    try {
        await userService.register(req.body);
        res.send("success");
    } catch (e) {
        next(e);
    }   
});

router.post('/login', async (req, res) => {
    try {
        let token = await userService.login(req.body.email, req.body.password);
        res.send(token)
    } catch (e) {
        next(e);
    }

});


module.exports = router;