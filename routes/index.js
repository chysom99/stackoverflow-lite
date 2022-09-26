const express = require('express');
const router = express.Router();
const createUserController = require('../controllers/user.js')
const { signup, login } = createUserController
const userAuth = require('../middleware/auth.js')
const auth_token = require('../middleware/auth_token')
const postQuestion = require('../controllers/postQuestion')

router.get('/', (req, res) => {
    console.log(req.headers)
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) { }
    res.send("I got you covered, hit me any time!! ");
})

router.post('/signup', userAuth.validateUser, signup)
router.post('/login', login )
router.post('/question', auth_token, postQuestion.createQuestion)
//router.post('/users', createUserController);


module.exports = router