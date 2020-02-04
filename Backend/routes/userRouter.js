
var userService = require('../service/userService');
var express = require('express');
var router = express.Router();
const authorizationService = require('../service/authorizationService')


// router.get('/', async (req, res, next) => {
//     try {
//         var user = await userService.getUserByEmail(req.param('email'));
//         res.send(user);
//     } catch (e) {
//         next(e);
//     }
// });

router.get('/password', async (req, res, next) => {
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
//     },
//     "keywords": ["word1", "word2"]
// }
router.post('/register', async (req, res, next) => {
    try {
        await userService.register(req.body);
        res.send({ status: "success" });
    } catch (e) {
        next(e);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        let token = await userService.login(req.body.email, req.body.password);
        res.send(token)
    } catch (e) {
        next(e);
    }

});

// get all users
// EDITOR
router.get('/', async (req, res, next) => {
    if (!authorizationService.checkAuthorization(req, authorizationService.roles.editor)) {
        let error = new Error('Unauthorized')
        error.status = 403;
        next(error);
        return;
    }
    try {
        let users = await userService.getAll()
        res.send({ users })
    } catch (e) {
        next(e);
    }
})


module.exports = router;