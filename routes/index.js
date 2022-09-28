const express = require('express');
const router = express.Router();
const createUserController = require('../controllers/user.js')
const { signup, login } = createUserController
const userAuth = require('../middleware/auth.js')
const auth_token = require('../middleware/auth_token')
const postQuestion = require('../controllers/postQuestion')
const postAnswer = require('../controllers/postAnswer')


router.get('/', (req, res) => {
    res.send("I got you covered, hit me any time!! ");
})

router.post('/signup', userAuth.validateUser, signup)
router.post('/login', login )
router.post('/question', auth_token, postQuestion.createQuestion)
router.post('/answer', auth_token, postAnswer.createAnswer)
//router.post('/users', createUserController);


module.exports = router